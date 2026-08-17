import { Elysia, t } from "elysia";
import { connect } from "./connect";
import { waStore } from "./wa-store";
import { db } from "../../database/db";
import { sentMessages } from "../../database/schema/sent-messages";
import { desc } from "drizzle-orm";
import { randomUUID } from "node:crypto";

let started = false;

export function initWhatsApp() {
  if (started) return;
  started = true;

  // Ensure the sent_messages table exists (idempotent)
  db.$client.run(`
    CREATE TABLE IF NOT EXISTS sent_messages (
      id TEXT PRIMARY KEY,
      number TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT NOT NULL,
      error TEXT,
      sent_at INTEGER NOT NULL DEFAULT (cast(unixepoch('subsecond') * 1000 as integer))
    )
  `);

  connect({
    onSocket: (socket) => {
      waStore.socket = socket;
      waStore.update({ user: socket?.user ?? null });
    },
    onUpdate: (update) => {
      waStore.update({
        ...(update.qr ? { qr: update.qr } : {}),
        ...(update.connection ? { status: update.connection } : {}),
        user: waStore.socket?.user ?? null,
      });
    },
  });
}

export const whatsapp = new Elysia({ prefix: "/whatsapp" })
  .ws("/ws", {
    open(ws) {
      waStore.subscribe(ws);
    },
    close(ws) {
      waStore.unsubscribe(ws);
    },
  })
  .get("/messages", async ({ query }) => {
    const limit = Math.min(Number(query.limit ?? 50), 200);
    const rows = await db
      .select()
      .from(sentMessages)
      .orderBy(desc(sentMessages.sentAt))
      .limit(limit);
    return rows;
  }, {
    query: t.Object({
      limit: t.Optional(t.String()),
    }),
  })
  .post(
    "/send",
    async ({ body }) => {
      const { number, message } = body;
      const jid = `${number}@s.whatsapp.net`;
      const socket = waStore.socket;
      const id = randomUUID();

      if (!socket) {
        throw new Error("WhatsApp no está conectado");
      }

      const res = await socket.onWhatsApp(jid);
      const result = res?.[0];

      if (result?.exists) {
        await socket.sendMessage(result.jid, { text: message });

        const now = new Date();
        const msg = {
          id,
          number,
          message,
          status: "sent" as const,
          error: null,
          sentAt: now,
        };

        await db.insert(sentMessages).values(msg);
        waStore.broadcastMessage({ ...msg, sentAt: now.getTime() });

        return { success: true };
      } else {
        const now = new Date();
        const msg = {
          id,
          number,
          message,
          status: "failed" as const,
          error: "El número no existe en WhatsApp",
          sentAt: now,
        };

        await db.insert(sentMessages).values(msg);
        waStore.broadcastMessage({ ...msg, sentAt: now.getTime() });

        throw new Error("El número no existe en WhatsApp");
      }
    },
    {
      body: t.Object({
        number: t.String(),
        message: t.String(),
      }),
    },
  );
