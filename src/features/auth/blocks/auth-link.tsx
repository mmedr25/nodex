import Link from "next/link";

export function AuthLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="underline-offset-4 hover:underline hover:text-foreground"
    >
      {label}
    </Link>
  );
}
