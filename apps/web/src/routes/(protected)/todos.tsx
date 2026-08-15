import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { client } from '@/lib/client'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/(protected)/todos')({
  loader: () => {
    return client.todos.get()
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { data } = Route.useLoaderData()

  const router = useRouter()

  const [text, setText] = useState('')

  const addTodo = async () => {
    if (text != '') {
      await client.todos.post({ name: text })
      setText('')
      router.invalidate()
    }
  }
  return (
    <div className="mx-auto flex h-screen items-center justify-center">
      <div>
        <div className="flex gap-2">
          <Input
            placeholder="Todo"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button onClick={() => addTodo()}>Add</Button>
        </div>
        {data?.map((todo) => (
          <p key={todo.id}>{todo.name}</p>
        ))}
      </div>
    </div>
  )
}
