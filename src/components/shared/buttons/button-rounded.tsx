import { Button } from "@/components/ui/button";
import type { ReactElement } from "react";
import Image from "next/image";
import GoogleIcon from "../../../../public/logos/google.svg"
import GithubIcon from "../../../../public/logos/github.svg"

const Icons = {
  google: GoogleIcon,
  github: GithubIcon
}

export function ButtonLogo({icon, alt, title, priority}: {icon: "google" | "github", alt: string, title: string, priority?: boolean}): ReactElement {

  return (
    <Button variant="outline" size="icon-lg" className="rounded-full" title={title}>
      <Image alt={alt} src={Icons[icon]} width={24} height={24} priority={priority} />
    </Button>
  );
}
