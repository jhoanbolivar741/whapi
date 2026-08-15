import { Spinner } from './ui/spinner'

export function PendingComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center gap-2">
      <Spinner />
      <p className="text-muted-foreground">Cargando ...</p>
    </div>
  )
}
