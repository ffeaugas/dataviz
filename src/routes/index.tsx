import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return <div className="min-h-[calc(100vh-var(--navbar-height))] bg-red">Bonjour </div>
}
