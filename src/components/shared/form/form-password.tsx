import type { FieldValues, Path } from "react-hook-form";
import { FormInput, type TextFieldProps } from "./form-input";
import type { ReactNode } from "react";

interface FormPasswordProps<T extends FieldValues>
  extends Omit<TextFieldProps<T>, "type" | "placeholder" | "label" | "name"> {
  name?: Path<T>;
  label?: string;
  children?: ReactNode;
}

export function FormPassword<T extends FieldValues>(
  props: FormPasswordProps<T>
) {
  return (
    <div className="relative">
      {!!props?.children && (
        <div className="absolute top-0 right-0 text-sm leading-4">
          {props?.children}
        </div>
      )}
      <FormInput
        name={(props?.name ?? "password") as Path<T>}
        label={props?.label ?? "Password"}
        placeholder="***********"
        type="password"
      />
    </div>
  );
}
