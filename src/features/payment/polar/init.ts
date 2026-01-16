import { polar, checkout, portal } from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";

export const polarClient = new Polar({
    accessToken: process.env.POLAR_ACCESS_TOKEN,
    // Use 'sandbox' if you're using the Polar Sandbox environment
    // Remember that access tokens, products, etc. are completely separated between environments.
    // Access tokens obtained in Production are for instance not usable in the Sandbox environment.
    server: process.env.NODE_ENV === "production" ? "production" : "sandbox"
});

export const polarPlugin = () => polar({
    client: polarClient,
    createCustomerOnSignUp: true,
    use: [
        checkout({
            products: [
                {
                    productId: "efea3ace-c32b-47f3-8949-5a84668ff26d",
                    slug: "nodex" // Custom slug for easy reference in Checkout URL, e.g. /checkout/nodex
                }
            ],
            successUrl: process.env.POLAR_SUCCESS_URL,
            authenticatedUsersOnly: true
        }),
        portal()
    ],
})

