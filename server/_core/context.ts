import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../drizzle/schema";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

/**
 * Portfolio context — all procedures are public, no session auth needed.
 * sdk.ts (and its axios import) is intentionally excluded here to keep
 * the Vercel Lambda dependency-free.
 */
export async function createContext(
  opts: CreateExpressContextOptions,
): Promise<TrpcContext> {
  return {
    req: opts.req,
    res: opts.res,
    user: null,
  };
}
