import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/{-$locale}/(auth)/_dashboard-layout/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_dashboard-layout/"!</div>
}
