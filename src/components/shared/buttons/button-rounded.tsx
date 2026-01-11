import { Button } from "@/components/ui/button";
import type { ReactElement } from "react";
import Image from "next/image";

export function ButtonLogo({icon, alt, title}: {icon: "google" | "github", alt: string, title: string}): ReactElement {
  
  return (
    <Button variant="outline" size="icon-lg" className="rounded-full" title={title}>
      <Image alt={alt} src={`/logos/${icon}.png`} width={24} height={24} />
    </Button>
  );
}
