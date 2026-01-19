import AppHeader from "@/components/shared/app-header";
import type { ReactNode } from "react";

function RestLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <AppHeader />
      <main className="flex-1 overflow-x-hidden">{children}</main>
    </>
  );
}

export default RestLayout;
