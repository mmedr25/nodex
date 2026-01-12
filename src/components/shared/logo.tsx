"use client";
import Image from "next/image";
import LogoIcon from "../../../public/logo.svg";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import type { Route } from 'next'

function Logo({ className, href }: { className?: string; href?: Route }) {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        if (!href) return;
        router.push(href);
      }}
      role={href ? "link" : "none"}
      className={clsx("size-12", {"cursor-pointer": !!href}, className)}
    >
      <Image src={LogoIcon} alt={"app logo"} />
    </div>
  );
}

export default Logo;
