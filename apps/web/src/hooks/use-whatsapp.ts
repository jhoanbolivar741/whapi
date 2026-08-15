// hooks/useWhatsApp.ts
import { client } from '@/lib/client'
import type { WAMessage, WAState } from '@/types/whatsapp'
import { useEffect, useRef, useState } from 'react'

export function useWhatsApp() {
  const [state, setState] = useState<WAState>({
    qr: '',
    status: 'close',
    user: null,
  })
  const wsRef = useRef<ReturnType<
    typeof client.api.whatsapp.ws.subscribe
  > | null>(null)

  useEffect(() => {
    const ws = client.api.whatsapp.ws.subscribe()
    wsRef.current = ws

    ws.on('message', (event) => {
      const message = event.data as unknown as WAMessage
      if (message.type === 'state') {
        setState(message.data)
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
