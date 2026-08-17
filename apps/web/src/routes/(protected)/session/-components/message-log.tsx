import type { SentMessage } from '@/types/whatsapp'
import { CheckCircle2Icon, XCircleIcon } from 'lucide-react'

interface Props {
  messages: SentMessage[]
}

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

function truncate(text: string, max = 60) {
  return text.length > max ? `${text.slice(0, max)}…` : text
}

export function MessageLog({ messages }: Props) {
  if (messages.length === 0) {
    return (
      <p className="text-muted-foreground py-6 text-center text-sm">
        No hay mensajes enviados aún
      </p>
    )
  }

  return (
    <div className="w-full overflow-auto rounded-md border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/50 text-muted-foreground border-b">
            <th className="px-4 py-2 text-left font-medium">Número</th>
            <th className="px-4 py-2 text-left font-medium">Mensaje</th>
            <th className="px-4 py-2 text-center font-medium">Estado</th>
            <th className="px-4 py-2 text-right font-medium">Hora</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg) => (
            <tr
              key={msg.id}
              className="hover:bg-muted/30 border-b transition-colors last:border-0"
            >
              <td className="px-4 py-2 font-mono">{msg.number}</td>
              <td
                className="text-foreground/80 max-w-xs px-4 py-2"
                title={msg.message}
              >
                {truncate(msg.message)}
              </td>
              <td className="px-4 py-2">
                <span className="flex items-center justify-center gap-1">
                  {msg.status === 'sent' ? (
                    <>
                      <CheckCircle2Icon className="text-green-500 size-4" />
                      <span className="text-green-600 text-xs font-medium">
                        Enviado
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircleIcon className="text-red-500 size-4" />
                      <span
                        className="text-red-600 text-xs font-medium"
                        title={msg.error ?? undefined}
                      >
                        Fallido
                      </span>
                    </>
                  )}
                </span>
              </td>
              <td className="text-muted-foreground px-4 py-2 text-right tabular-nums">
                {formatTime(msg.sentAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
