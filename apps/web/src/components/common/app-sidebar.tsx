import { Sidebar } from "../ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return <Sidebar {...props}></Sidebar>;
}
