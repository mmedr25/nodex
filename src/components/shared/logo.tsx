"use client";
import Image from "next/image";
import LogoIcon from "../../../public/logo.svg";
import { useRouter } from "next/navigation";

import type { Route } from 'next'
import { cn } from "@/lib/utils";

function Logo({ className, href }: { className?: string; href?: Route }) {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        if (!href) return;
        router.push(href);
      }}
      role={href ? "link" : "none"}
      className={cn("size-12", className, {"cursor-pointer": !!href})}
    >
      <Image src={LogoIcon} alt={"app logo"} />
    </div>
  );
}

export default Logo;
