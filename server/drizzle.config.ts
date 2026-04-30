import "dotenv/config";
import { defineConfig } from "drizzle-kit";

// Forçar carregamento do .env
import * as dotenv from "dotenv";
dotenv.config({ path: "server/.env" });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is required to run drizzle commands");
}

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle",
  dialect: "postgresql", // Alterado de 'mysql' para 'postgresql'
  dbCredentials: {
    url: connectionString,
    ssl: connectionString.includes("supabase.co")
      ? { rejectUnauthorized: false }
      : undefined,
  },
});