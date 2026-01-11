"use client";
import { authClient } from "@/features/auth/auth-client";

export default function Home() {
  const { data } = authClient.useSession();
  return (
    <div>
      {JSON.stringify(data)}
    </div>
  );
}
