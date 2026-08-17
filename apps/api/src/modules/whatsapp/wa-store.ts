import type makeWASocket from "@whiskeysockets/baileys";

type WAUser = ReturnType<typeof makeWASocket>["user"];

export interface WAState {
  qr: string;
  status: "open" | "connecting" | "close";
  user: WAUser | null;
}

export interface SentMessage {
  id: string;
  number: string;
  message: string;
  status: "sent" | "failed";
  error: string | null;
  sentAt: number;
}

interface Subscriber {
  send: (data: string) => void;
}

class WhatsAppStore {
  socket: ReturnType<typeof makeWASocket> | null = null;

  state: WAState = {
    qr: "",
    status: "close",
    user: null,
  };

  private subscribers = new Set<Subscriber>();

  subscribe(ws: Subscriber) {
    this.subscribers.add(ws);
    ws.send(JSON.stringify({ type: "state", data: this.state }));
  }

  unsubscribe(ws: Subscriber) {
    this.subscribers.delete(ws);
  }

  update(partial: Partial<WAState>) {
    this.state = { ...this.state, ...partial };
    this.broadcast({ type: "state", data: this.state });
  }

  broadcastMessage(msg: SentMessage) {
    this.broadcast({ type: "message", data: msg });
  }

  private broadcast(payload: unknown) {
    const json = JSON.stringify(payload);
    for (const sub of this.subscribers) {
      sub.send(json);
    }
  }
}

export const waStore = new WhatsAppStore();
