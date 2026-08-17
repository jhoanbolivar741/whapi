import { Elysia, t } from "elysia";
import { connect } from "./connect";
import { waStore } from "./wa-store";

let started = false;

export function initWhatsApp() {
  if (started) return;
  started = true;

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
  .post(
    "/send",
    async ({ body }) => {
      const { number, message } = body;
      const jid = `${number}@s.whatsapp.net`;
      const socket = waStore.socket;

      if (!socket) {
        throw new Error("WhatsApp no está conectado");
      }

      const res = await socket.onWhatsApp(jid);
      const result = res?.[0];

      if (result?.exists) {
        await socket.sendMessage(result.jid, { text: message });
      } else {
        throw new Error("El número no existe en WhatsApp");
      }

      return { success: true };
    },
    {
      body: t.Object({
        number: t.String(),
        message: t.String(),
      }),
    },
  );
