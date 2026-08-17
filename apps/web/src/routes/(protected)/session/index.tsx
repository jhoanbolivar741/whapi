import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'
import { useWhatsApp } from '@/hooks/use-whatsapp'
import { createFileRoute } from '@tanstack/react-router'
import { MessageSquareIcon, UserCircle2Icon } from 'lucide-react'
import { QrPanel } from './-components/qr-panel'
import { MessageLog } from './-components/message-log'

export const Route = createFileRoute('/(protected)/session/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { qr, status, user, messages } = useWhatsApp()

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center gap-6 px-4 py-8">
      {status !== 'open' && qr && <QrPanel qrValue={qr} status={status} />}

      {status === 'open' && user && (
        <div className="flex w-full max-w-3xl flex-col gap-4">
          {/* Connected user card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-primary text-2xl">
                WhatsApp Conectado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Item variant="muted">
                <ItemMedia variant="icon">
                  <UserCircle2Icon />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{user.id}</ItemTitle>
                  <ItemDescription>{user.name}</ItemDescription>
                </ItemContent>
              </Item>
            </CardContent>
          </Card>

          {/* Message monitor */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MessageSquareIcon className="text-primary size-5" />
                Monitor de mensajes
                <span className="text-muted-foreground ml-auto text-sm font-normal">
                  {messages.length} mensaje{messages.length !== 1 ? 's' : ''}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MessageLog messages={messages} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
