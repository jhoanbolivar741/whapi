import { PendingComponent } from '@/components/pending-component'
import { authClient } from '@/lib/auth-client'
import { createFileRoute, Link, Outlet, redirect } from '@tanstack/react-router'
import z from 'zod'
import { fallback } from './-constants/fallback'

export const Route = createFileRoute('/(auth)')({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  beforeLoad: async ({ search }) => {
    const session = await authClient.getSession()
    if (session.data) {
      throw redirect({ to: search.redirect || fallback })
    }
    return { session }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { isPending } = authClient.useSession()

  if (isPending) return <PendingComponent />

  return (
    <div className="grid min-h-svh">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              {/* <AppLogoIcon className="size-4" /> */}
            </div>
            React Starter Kit
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Outlet />
          </div>
        </div>
      </div>
      {/* <div className="bg-muted relative hidden lg:block">
        <img
          src={placeholder}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div> */}
    </div>
  )
}
