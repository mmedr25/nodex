"use client";

import { Form as BaseForm } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type DefaultValues,
  type FieldValues,
  type SubmitErrorHandler,
  type SubmitHandler,
  useForm,
  type UseFormProps,
} from "react-hook-form";
import type { ZodEffectsDef, ZodObjectDef, ZodType } from "zod/v3";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CustomForm<T extends FieldValues> {
  schema: ZodType<T, ZodObjectDef | ZodEffectsDef>;
  defaultValues: DefaultValues<T>;
  children: ReactNode;
  onSubmit: SubmitHandler<T>;
  onError?: SubmitErrorHandler<T>;
  options?: Omit<UseFormProps<T>, "defaultValues">;
}

interface FormProps<T extends FieldValues> extends CustomForm<T> {
  className?: ComponentProps<"div">["className"];
}

export function CustomForm<T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  onError,
  children,
  options,
}: CustomForm<T>) {
  const { mode, ...optionsRest } = options ?? {};

  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: mode ?? "all",
    ...optionsRest,
  });

  return (
    <BaseForm {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)} noValidate>
        {children}
      </form>
    </BaseForm>
  );
}

export function Form<T extends FieldValues>({
  children,
  className,
  ...rest
}: FormProps<T>) {
  return (
    <CustomForm {...rest}>
      <div className={cn("flex flex-col gap-6", className)}>{children}</div>
    </CustomForm>
  );
}
