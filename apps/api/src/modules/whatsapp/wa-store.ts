import type makeWASocket from "@whiskeysockets/baileys";

type WAUser = ReturnType<typeof makeWASocket>["user"];

export interface WAState {
  qr: string;
  status: "open" | "connecting" | "close";
  user: WAUser | null;
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
    this.broadcast();
  }

  private broadcast() {
    const payload = JSON.stringify({ type: "state", data: this.state });
    for (const sub of this.subscribers) {
      sub.send(payload);
    }
  }
}

export const waStore = new WhatsAppStore();
