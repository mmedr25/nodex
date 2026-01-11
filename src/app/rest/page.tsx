"use client";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/features/auth/helper";

export default function Home() {
   const { logout } = useLogout()
  return (
    <div>
      protected
      <Button onClick={logout}>log out</Button>
    </div>
  );
}
