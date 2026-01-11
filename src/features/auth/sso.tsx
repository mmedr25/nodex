// "use client";

import { ButtonLogo } from "@/components/shared/buttons/button-rounded";
import { CardDescription } from "@/components/ui/card";

export function SSO({title}: {title: string}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <CardDescription>{title}</CardDescription>
      <div className="flex gap-3">
        <ButtonLogo icon={"google"} alt="Google logo" title="Sign in with google"/>
        <ButtonLogo icon={"github"} alt="GitHub logo" title="Sign in with github"/>
      </div>
    </div>
  );
}
