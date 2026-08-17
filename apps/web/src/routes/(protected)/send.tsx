import { useAppForm } from '@/hooks/use-app-form'
import { client } from '@/lib/client'
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'

export const Route = createFileRoute('/(protected)/send')({
  component: RouteComponent,
})

function RouteComponent() {
  const form = useAppForm({
    defaultValues: {
      number: '',
      message: '',
    },
    validators: {
      onSubmit: z.object({
        number: z
          .string()
          .regex(/^\d+$/, 'El número debe contener solo números')
          .min(10, 'El número debe tener al menos 10 dígitos'),
        message: z.string().min(1, 'El mensaje no puede estar vacío'),
      }),
    },
    onSubmit: ({ value }) => client.api.whatsapp.send.post(value),
  })
  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-2xl font-bold">Enviar mensaje</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <form.AppField name="number">
          {(field) => (
            <field.TextField
              label="Número"
              placeholder="Número de teléfono"
              tabIndex={1}
              autoFocus
            />
          )}
        </form.AppField>
        <form.AppField name="message">
          {(field) => (
            <field.TextField
              label="Mensaje"
              placeholder="Mensaje"
              tabIndex={2}
            />
          )}
        </form.AppField>
        <form.AppForm>
          <form.SubmitButton label="Enviar" tabIndex={3} />
        </form.AppForm>
      </form>
    </div>
  )
}
