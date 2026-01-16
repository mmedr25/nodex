import "server-only";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { accounts, sessions, users, verifications } from "@/db/schema/auth";
import { polarPlugin } from "../payment/polar/init";

export const options = {
    
    // auth methods
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        requireEmailVerification: false,
    },
    // tables
    // user: { modelName: "users" },
    // account: { modelName: "accounts" },
    // session: { modelName: "sessions" },
    // verification: { modelName: "verifications" },
    plugins: [
        polarPlugin()
    ],
    // db configuration
    database: drizzleAdapter(db, {
        provider: "pg",
        camelCase: false,
        usePlural: true,
        schema: {
            users: users,
            accounts: accounts,
            sessions: sessions,
            verifications: verifications,
        }
    }),
}

export const auth = betterAuth(options);


