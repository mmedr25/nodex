import type { FieldValues, Path } from "react-hook-form";
import { FormInput, type TextFieldProps } from "./form-input";

interface FormPasswordProps<T extends FieldValues>
  extends Omit<TextFieldProps<T>, "type" | "placeholder" | "label" | "name"> {
  name?: Path<T>;
  label?: string;
}

export function FormPassword<T extends FieldValues>(
  props: FormPasswordProps<T>
) {
  return (
    <FormInput
      name={(props?.name ?? "password") as Path<T>}
      label={props?.label ?? "Password"}
      placeholder="***********"
      type="password"
    />
  );
}
