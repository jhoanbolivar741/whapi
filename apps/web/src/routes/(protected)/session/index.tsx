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
import { UserCircle2Icon } from 'lucide-react'
import { QrPanel } from './-components/qr-panel'

export const Route = createFileRoute('/(protected)/session/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { qr, status, user } = useWhatsApp()

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center">
      {status !== 'open' && qr && <QrPanel qrValue={qr} status={status} />}
      {status === 'open' && user && (
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
      )}
    </div>
  )
}
