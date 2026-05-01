import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres"; // Alterado de 'drizzle-orm/mysql2'
import { InsertUser, users, contacts, InsertContact } from "./drizzle/schema";
import { ENV } from './_core/env';
import { Pool } from 'pg'; // Importe o Pool do 'pg'
import 'dotenv/config';


let _db: ReturnType<typeof drizzle> | null = null;
let _pool: Pool | null = null; // Adicione um pool para PostgreSQL

if (process.env.NODE_ENV !== 'production') {
  getDb().then(db => {
    if (db) console.log('Banco de dados conectado com sucesso');
  });
}

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      // Remove o parâmetro sslmode da URL, que força verify-full
      const cleanUrl = process.env.DATABASE_URL.replace(/\?sslmode=require$/, '');

      _pool = new Pool({
        connectionString: cleanUrl,
        max: 10,
        ssl: { rejectUnauthorized: false }, // Supabase usa certificado autoassinado
      });
      _db = drizzle(_pool);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
      _pool = null;
    }
  }
  return _db;
}
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// async function testConnection() {
//   try {
//     const res = await pool.query('SELECT NOW()');
//     console.log('Banco conectado:', res.rows[0]);
//   } catch (err) {
//     console.error('Erro na conexão:', err);
//   }
// }

// testConnection();

// console.log('DATABASE_URL:', process.env.DATABASE_URL);

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values)
      .onConflictDoUpdate({ // Alterado de 'onDuplicateKeyUpdate'
        target: users.openId, // Coluna para identificar conflito
        set: updateSet,
      });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Contatos do portfolio
export async function createContact(data: InsertContact) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.insert(contacts).values(data);
  return result;
}

export async function getContacts() {
  const db = await getDb();
  if (!db) {
    return [];
  }

  return await db.select().from(contacts);
}

// TODO: add feature queries here as your schema grows.