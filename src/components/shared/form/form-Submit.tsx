import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

export function FormSubmit({ children, className, disabled, ...rest }: ButtonProps) {
  const form = useFormContext();

  return (
    <Button {...rest} disabled={disabled || form.formState.isSubmitting} type="submit" className={cn("w-full", className)}>
      {children}
    </Button>
  );
}
