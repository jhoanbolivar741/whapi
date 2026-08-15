import { Field, FieldDescription, FieldGroup } from '@/components/ui/field'
import { toast } from '@/components/ui/toast'
import { useAppForm } from '@/hooks/use-app-form'
import { authClient } from '@/lib/auth-client'
import { createFileRoute, Link } from '@tanstack/react-router'
import z from 'zod'

export const Route = createFileRoute('/(auth)/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = Route.useNavigate()

  const form = useAppForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      await authClient.signIn.email(
        {
          email: value.email,
          password: value.password,
        },
        {
          onSuccess: () => {
            navigate({
              to: '/dashboard',
            })
            toast.add({ title: 'Sign in successful', type: 'success' })
          },
          onError: (error) => {
            toast.add({
              title: error.error.message || error.error.statusText,
              type: 'error',
            })
          },
        },
      )
    },
    validators: {
      onSubmit: z.object({
        email: z.email('Invalid email address'),
        password: z.string().min(8, 'Password must be at least 8 characters'),
      }),
    },
  })

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <form.AppField name="email">
          {(field) => (
            <field.TextField
              label="Email"
              type="email"
              placeholder="email@example.com"
              tabIndex={1}
              autoFocus
            />
          )}
        </form.AppField>
        <form.AppField name="password">
          {(field) => (
            <field.PasswordField
              label="Password"
              placeholder="password"
              tabIndex={2}
            />
          )}
        </form.AppField>
        <Field>
          <form.AppForm>
            <form.SubmitButton label="Login" tabIndex={4} />
          </form.AppForm>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{' '}
            <Link
              to="/register"
              className="underline underline-offset-4"
              tabIndex={5}
            >
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
