import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// synchronous connection and no need for singleton pattern 
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });
