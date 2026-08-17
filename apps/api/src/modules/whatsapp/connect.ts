import makeWASocket, {
  Browsers,
  DisconnectReason,
  useMultiFileAuthState,
} from "@whiskeysockets/baileys";
import { Boom } from "@hapi/boom";
import fs from "node:fs";

type ConnectionState = Partial<{
  connection: "open" | "connecting" | "close";
  lastDisconnect?: { error: Boom | Error | undefined; date: Date };
  isNewLogin?: boolean;
  qr?: string;
  receivedPendingNotifications?: boolean;
  isOnline?: boolean;
}>;

interface Props {
  onSocket: (socket: ReturnType<typeof makeWASocket> | null) => void;
  onUpdate?: (update: ConnectionState) => void;
}

export async function connect(props?: Props) {
  const { state, saveCreds } = await useMultiFileAuthState("auth_info_baileys");

  const sock = makeWASocket({
    auth: state,
    markOnlineOnConnect: false,
    browser: ["Whapi", "Opera GX", "120.0.5543.204"],
  });

  props?.onSocket?.(sock);

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;

    console.log("connection update", update);

    props?.onUpdate?.(update);

    if (connection === "close") {
      props?.onSocket?.(null);

      const code = (lastDisconnect?.error as Boom)?.output?.statusCode;
      if (code === DisconnectReason.loggedOut) {
        fs.rmSync("./auth_info_baileys", { recursive: true, force: true });
      }
      connect(props);
    }
  });

  sock.ev.on("creds.update", saveCreds);
}
