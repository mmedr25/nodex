import { authClient } from "@/features/auth/auth-client"

export const paymentCheckout = ({email}: {email?: string}) => {
    authClient.checkout({
        slug: "nodex",
        email
    })
}