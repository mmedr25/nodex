import { EmailPassword } from "../email-password";
import { SSO } from "../sso";
import { Divider } from "../blocks/divider";
import { AuthCard } from "../blocks/auth-card";
import {AuthLink} from "../blocks/auth-link";
import { AUTH_FORM_ROUTES } from "@/lib/constants";

function SignInForm() {
  return (
    <AuthCard title="Sign in" description="Enter your credentials to access your account">  
       <SSO title="Sign in with your SSO provider"/>
        <Divider />
        <div className="space-y-3">
          <EmailPassword />
          <p className="text-muted-foreground text-sm text-center space-x-1">
            <span>Don't have an account?</span>
            <AuthLink href={AUTH_FORM_ROUTES.signup} label="Sign up" />
          </p>
        </div>
    </AuthCard>
  );
}

export default SignInForm;
