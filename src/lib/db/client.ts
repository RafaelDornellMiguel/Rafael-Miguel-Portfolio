import { Pool, type QueryResultRow } from "pg";

export type ContactRecord = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

let pool: Pool | null = null;

/**
 * TLS: verificação de certificado sempre ligada. Se o provedor usa CA própria,
 * o certificado entra por DATABASE_CA_CERT — nunca por rejectUnauthorized:false.
 */
function buildSslConfig(): { ca?: string; rejectUnauthorized: boolean } {
  const ca = process.env.DATABASE_CA_CERT;
  return ca ? { ca, rejectUnauthorized: true } : { rejectUnauthorized: true };
}

function getPool(): Pool | null {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return null;

  if (!pool) {
    pool = new Pool({
      connectionString,
      max: 3,
      ssl: buildSslConfig(),
      connectionTimeoutMillis: 5_000,
      idleTimeoutMillis: 10_000,
      statement_timeout: 5_000,
    });
    pool.on("error", (error) => {
      console.error(
        JSON.stringify({ level: "error", scope: "DB:POOL", message: error.message }),
      );
    });
  }

  return pool;
}

/**
 * Única porta de entrada no banco. `text` é sempre literal do código e os
 * valores vão parametrizados — entrada de usuário nunca é concatenada em SQL.
 */
export async function query<T extends QueryResultRow>(
  text: string,
  values: unknown[] = [],
): Promise<T[]> {
  const database = getPool();
  if (!database) throw new Error("DATABASE_URL não configurada");

  const result = await database.query<T>(text, values);
  return result.rows;
}

export async function insertContact(record: ContactRecord): Promise<boolean> {
  if (!isDatabaseConfigured()) return false;

  await query(
    `INSERT INTO contacts (name, email, phone, subject, message)
     VALUES ($1, $2, $3, $4, $5)`,
    [record.name, record.email, record.phone, record.subject, record.message],
  );

  return true;
}

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}
