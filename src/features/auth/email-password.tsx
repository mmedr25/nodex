"use client";
import { Form } from "@/components/shared/form/form";
import { FormEmail } from "@/components/shared/form/form-email";
import { FormPassword } from "@/components/shared/form/form-password";
import { FormSubmit } from "@/components/shared/form/form-Submit";
import z from "zod/v3";
import Link from "next/link";
import { useAuth } from "./helper";

const emailPasswordDefaultValues = {
  email: "",
  password: "",
};

const emailPasswordFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type EmailPasswordFormValues = z.infer<typeof emailPasswordFormSchema>;

 
export const EmailPassword = () => {
  const { loginEmailPassword } = useAuth();

  return (
    <Form
      defaultValues={emailPasswordDefaultValues}
      schema={emailPasswordFormSchema}
      onSubmit={loginEmailPassword}
    >
      <FormEmail />
      <FormPassword>
        <Link href="/forgot-password" className="underline-offset-4 hover:underline text-destructive">Forgot password?</Link>
      </FormPassword>
      <FormSubmit>Sign In</FormSubmit>
    </Form>
  );
};
