import Link from "next/link";
import type { Route } from 'next'

export function AuthLink({ href, label }: { href: Route; label: string }) {
  return (
    <Link
      href={href}
      className="underline-offset-4 hover:underline hover:text-foreground"
    >
      {label}
    </Link>
  );
}
