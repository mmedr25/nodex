import AppSidebar from "@/components/shared/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { ReactNode } from "react";

function DashboardLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="">{children}</SidebarInset>
    </SidebarProvider>
  );
}

export default DashboardLayout;
