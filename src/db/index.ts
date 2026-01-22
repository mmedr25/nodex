import "@/lib/env-config"
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { uuid } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// synchronous connection and no need for singleton pattern 
const sqlClient = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sqlClient, casing: 'snake_case', logger: process.env.NODE_ENV !== "production"});

// shortcuts
export const id = uuid("id").primaryKey().default(sql`uuid_generate_v7()`)