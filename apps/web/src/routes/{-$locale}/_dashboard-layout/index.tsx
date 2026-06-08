import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/{-$locale}/_dashboard-layout/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_dashboard-layout/"!</div>
}
