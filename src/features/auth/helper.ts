import type { SubmitHandler } from "react-hook-form";
import { authClient } from "./auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import type { EmailPasswordFormValues } from "./email-password";
import { AUTH_FORM_ROUTES } from "@/lib/constants";
import type { Route } from "next";


export const useAuth = () => {
    // Implement email-password authentication hooks here
    const router = useRouter();
    const searchParams = useSearchParams()

    const redirect = (searchParams.get("redirect") ?? "/") as Route;

    // 
    const loginEmailPassword: SubmitHandler<EmailPasswordFormValues> = (data) => {
        authClient.signIn.email({
            email: data.email,
            password: data.password,
        }, {
            onSuccess: () => {
                router.push(redirect);
            },
            onError: (err) => {
                toast.error(err.error.message);
            }
        });
    };

    // 
    const logout = () => {
        authClient.signOut({
            fetchOptions: {
                onSuccess() {
                    router.push(AUTH_FORM_ROUTES.signin);
                },
            }
        })
    }

    return { loginEmailPassword, logout };

}