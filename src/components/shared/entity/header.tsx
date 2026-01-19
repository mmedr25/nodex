import { Button } from "@/components/ui/button";
import type { XOR } from "@/lib/types";
import { PlusIcon } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { type ReactNode } from "react";

interface EntityInfo {
  title: string;
  description?: string;
  action?: ReactNode;
}

function EntityHeader({ description, title, action }: EntityInfo) {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-6">
      <div>
        <h1 className="text-lg md:text-2xl font-semibold">{title}</h1>
        {description && (
          <p
            className="text-xs md:text-sm text-muted-foreground"
            role="complementary"
          >
            {description}
          </p>
        )}
      </div>
      <div>{action}</div>
    </div>
  );
}

type EntityHeaderAction = {
  label: string;
  disabled?: boolean;
} & XOR<{ onClick: (props: any) => void }, { href: Route }>;

EntityHeader.Action = ({
  href,
  onClick,
  label,
  disabled,
}: EntityHeaderAction) => {
  return (
    <Button size={"sm"} disabled={disabled} onClick={onClick} asChild={!!href}>
      {!!href ? (
        <Link href={href as Route}>
          <ActionContent label={label} />
        </Link>
      ) : (
        <ActionContent label={label} />
      )}
    </Button>
  );
};

const ActionContent = ({ label }: { label: string }) => {
  return (
    <>
      <PlusIcon className="size-4" />
      <span className="first-letter:uppercase">{label}</span>
    </>
  );
};

export default EntityHeader;
