import { Link } from '@tanstack/react-router'
import { HomeIcon } from 'lucide-react'
import { Button } from './ui/button'

export function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
      <p className="text-muted-foreground">404 No Encontrado</p>
      <Link to="/">
        <Button variant="secondary">
          <HomeIcon />
          Ir al inicio
        </Button>
      </Link>
    </div>
  )
}
