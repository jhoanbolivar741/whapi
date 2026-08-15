import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldGroup } from '@/components/ui/field'
import { Spinner } from '@/components/ui/spinner'
import { toast } from '@/components/ui/toast'
import { useAppForm } from '@/hooks/use-app-form'
import { authClient } from '@/lib/auth-client'
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'

export const Route = createFileRoute('/(auth)/register')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = Route.useNavigate()

  const form = useAppForm({
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
    onSubmit: async ({ value }) => {
      await authClient.signUp.email(
        {
          email: value.email,
          password: value.password,
          name: value.name,
        },
        {
          onSuccess: () => {
            navigate({
              to: '/dashboard',
            })
            toast.add({ title: 'Sign up successful', type: 'success' })
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
        name: z.string().min(2, 'Name must be at least 2 characters'),
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
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your details below to create your account
          </p>
        </div>
        <form.AppField name="name">
          {(field) => (
            <field.TextField label="Name" placeholder="Full Name" autoFocus />
          )}
        </form.AppField>
        <form.AppField name="email">
          {(field) => (
            <field.TextField
              label="Email"
              type="email"
              placeholder="email@example.com"
            />
          )}
        </form.AppField>
        <form.AppField name="password">
          {(field) => (
            <field.PasswordField label="Password" placeholder="password" />
          )}
        </form.AppField>

        <Field>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit || isSubmitting}>
                {isSubmitting && <Spinner />}
                Register
              </Button>
            )}
          </form.Subscribe>
          <FieldDescription className="text-center">
            Already have an account?{' '}
            <Route.Link to="/login" className="underline underline-offset-4">
              Login
            </Route.Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
