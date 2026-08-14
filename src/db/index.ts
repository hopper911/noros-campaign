import { drizzle } from "drizzle-orm/node-postgres";
import { sql } from "drizzle-orm";
import { Pool } from "pg";
import * as schema from "@/db/schema";

const globalForDb = globalThis as unknown as {
  pool?: Pool;
  schemaReady?: Promise<void>;
};

export function getPool() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (!globalForDb.pool) {
    globalForDb.pool = new Pool({
      connectionString: url,
      max: 5,
    });
  }
  return globalForDb.pool;
}

export function getDb() {
  const pool = getPool();
  if (!pool) return null;
  return drizzle(pool, { schema });
}

export async function ensureSchema() {
  const db = getDb();
  if (!db) return null;
  if (!globalForDb.schemaReady) {
    globalForDb.schemaReady = (async () => {
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS site_content (
          id text PRIMARY KEY,
          document jsonb NOT NULL,
          updated_at timestamptz NOT NULL DEFAULT now()
        )
      `);
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS media (
          id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          kind text NOT NULL,
          mime text NOT NULL,
          bytes bytea NOT NULL,
          created_at timestamptz NOT NULL DEFAULT now()
        )
      `);
    })().catch((err) => {
      globalForDb.schemaReady = undefined;
      throw err;
    });
  }
  await globalForDb.schemaReady;
  return db;
}
