import { polarClient } from "@polar-sh/better-auth"
import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { AuthType } from "./auth";


export const authClient = createAuthClient({
    plugins: [
        inferAdditionalFields<AuthType>(),
        polarClient()
    ],
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: "http://localhost:3000",
})