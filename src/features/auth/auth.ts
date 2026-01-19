import "server-only";
import { betterAuth, string } from "better-auth";
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
    user: {
        additionalFields: {
            firstName: {
                type: "string",
                input: true
            },
            lastName: {
                type: "string",
                input: true
            },
        }
    },
    // account: { modelName: "accounts" },
    // session: { modelName: "sessions" },
    // verification: { modelName: "verifications" },
    plugins: [
        polarPlugin()
    ],
    // db configuration
    advanced: {
        database: {
            generateId: false,
        },
    },

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
} satisfies Parameters<typeof betterAuth>[0]

export const auth = betterAuth(options);

export type AuthType = typeof auth
