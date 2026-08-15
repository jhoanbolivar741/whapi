import { Spinner } from '@/components/ui/spinner'
import QRCode from 'react-qr-code'

interface Props {
  qrValue?: string
  status: 'open' | 'connecting' | 'close'
}

export function QrPanel({ status, qrValue }: Props) {
  if (status === 'open') return null

  return (
    <div className="border-border bg-card text-card-foreground flex gap-4 border">
      <div className="flex size-72 items-center justify-center bg-white p-4">
        {qrValue && <QRCode value={qrValue} />}
        {!qrValue && status === 'connecting' && <Spinner />}
      </div>
      <div className="text-muted-foreground flex items-center justify-center p-4">
        <p className="text-center">
          Escanea el código QR y sigue los pasos para conectar tu WhatsApp
        </p>
      </div>
    </div>
  )
}
