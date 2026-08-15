import { PendingComponent } from '@/components/pending-component'
import { authClient } from '@/lib/auth-client'
import { createFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const { data, isPending } = authClient.useSession()

  if (isPending) return <PendingComponent />

  if (!data?.session) {
    return <Navigate to="/login" />
  }
  return <Navigate to="/dashboard" />
}
