"use client";
import { SSO } from "../sso";
import { Divider } from "../blocks/divider";
import { AuthCard } from "../blocks/auth-card";
import { AuthLink } from "../blocks/auth-link";
import { Form } from "@/components/shared/form/form";
import { FormEmail } from "@/components/shared/form/form-email";
import { FormPassword } from "@/components/shared/form/form-password";
import { FormSubmit } from "@/components/shared/form/form-Submit";
import type { SubmitHandler } from "react-hook-form";
import z from "zod/v3";
import { authClient } from "../auth-client";
import { useRouter } from "next/navigation";
import { FormInput } from "@/components/shared/form/form-input";
import { AUTH_FORM_ROUTES } from "@/lib/constants";

const SignupDefaultValues = {
  email: "john.doe@example.com",
  name: "john doe",
  password: "12345678",
  passwordConfirm: "12345678",
};

const SignupFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8),
  passwordConfirm: z.string(),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords do not match",
  path: ["passwordConfirm"],
});

type SignupFormValues = z.infer<typeof SignupFormSchema>;

export const SignUp = () => {
  const router = useRouter();

  const handleSubmit: SubmitHandler<SignupFormValues> = async (data) => {
    
    authClient.signUp.email({
      email: data.email,
      password: data.password,
      name: data.email,
    }, {
      onSuccess: () => {
        router.push(AUTH_FORM_ROUTES.signin);
      },
      onError: (error) => {
        router.push(AUTH_FORM_ROUTES.signin);
      }
    });
  };

  return (
    <Form
      defaultValues={SignupDefaultValues}
      schema={SignupFormSchema}
      onSubmit={handleSubmit}
    >
      <FormInput<SignupFormValues> label="Name" name="name" placeholder="John doe" />
      <FormEmail />
      <FormPassword />
      <FormPassword<SignupFormValues> label="Confirm Password" name="passwordConfirm" />
      <FormSubmit>Sign Up</FormSubmit>
    </Form>
  );
};

function SignUpForm() {
  return (
    <AuthCard title="Sign up" description="Create a new account">  
       <SSO title="Sign up with your SSO provider"/>
        <Divider />
        <div className="space-y-3">
          <SignUp />
          <p className="text-muted-foreground text-sm text-center space-x-1">
            <span>Already have an account?</span>
            <AuthLink href={AUTH_FORM_ROUTES.signin} label="Sign in" />
          </p>
        </div>
    </AuthCard>
  );
}

export default SignUpForm;
