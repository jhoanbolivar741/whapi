import { client } from '@/lib/client'
import type { SentMessage, WAMessage, WAState } from '@/types/whatsapp'
import { useEffect, useRef, useState } from 'react'

interface WhatsAppHookState extends WAState {
  messages: SentMessage[]
}

export function useWhatsApp() {
  const [state, setState] = useState<WhatsAppHookState>({
    qr: '',
    status: 'close',
    user: null,
    messages: [],
  })

  const wsRef = useRef<ReturnType<
    typeof client.api.whatsapp.ws.subscribe
  > | null>(null)

  // Load initial messages from the API
  useEffect(() => {
    client.api.whatsapp.messages.get().then(({ data }) => {
      if (data) {
        setState((prev) => ({
          ...prev,
          messages: (data as Array<Omit<SentMessage, 'sentAt'> & { sentAt: Date | number }>).map(
            (item) => ({
              ...item,
              sentAt: item.sentAt instanceof Date ? item.sentAt.getTime() : Number(item.sentAt),
            }),
          ),
        }))
      }
    })
  }, [])

  // Subscribe to real-time updates via WebSocket
  useEffect(() => {
    const ws = client.api.whatsapp.ws.subscribe()
    wsRef.current = ws

    ws.on('message', (event) => {
      const msg = event.data as unknown as WAMessage

      if (msg.type === 'state') {
        setState((prev) => ({ ...prev, ...msg.data }))
      } else if (msg.type === 'message') {
        setState((prev) => ({
          ...prev,
          // Prepend so newest is always first
          messages: [msg.data, ...prev.messages],
        }))
      }
    })

    ws.on('close', () => {
      console.log('WebSocket cerrado')
    })

    return () => {
      ws.close()
    }
  }, [])

  return state
}
