import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardLayout } from "~/layouts/dashboard-layout";

export const Route = createFileRoute("/_dashboard-layout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
