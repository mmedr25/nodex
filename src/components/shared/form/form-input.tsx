"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { ComponentProps } from "react";
import { type FieldValues, type Path, useFormContext } from "react-hook-form";

export interface TextFieldProps<T extends FieldValues>
  extends ComponentProps<"input"> {
  name: Path<T>;
  label: string;
}

export function FormInput<T extends FieldValues>({
  name,
  label,
  type = "text",
  placeholder,
  disabled = false,
  ...props
}: TextFieldProps<T>) {
  const ctx = useFormContext<T>();

  return (
    <FormField
      control={ctx.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...props}
              {...field}
              disabled={disabled || ctx.formState.isSubmitting} 
              type={type}
              placeholder={placeholder}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
