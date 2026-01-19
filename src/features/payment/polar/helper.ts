import { authClient } from "@/features/auth/auth-client"

export const paymentCheckout = () => {
    authClient.checkout({
        slug: "nodex",
    })
}