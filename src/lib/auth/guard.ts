import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

import { authOptions } from "./options";
import { ApiError } from "../api/errors";

class UnauthorizedError extends ApiError {
  constructor() {
    super("UnauthorizedError", 401, {
      message: "Você precisa estar autenticado para acessar este recurso.",
      action: "Entre com sua conta do GitHub em /admin/login.",
      errorLocationCode: "AUTH:GUARD:NO_SESSION",
    });
  }
}

class ForbiddenError extends ApiError {
  constructor(login: string | null) {
    super("ForbiddenError", 403, {
      message: "Esta conta não tem permissão para esta operação.",
      action: "Somente a conta administradora do site pode acessar o painel.",
      errorLocationCode: "AUTH:GUARD:NOT_IN_ALLOWLIST",
      internalContext: { login },
    });
  }
}

/**
 * Porta única das rotas /api/v1/admin/*. Falha fechada: sem sessão é 401,
 * sessão de outra conta é 403 — o handler nunca roda sem passar por aqui.
 */
export async function requireAdmin(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<{ login: string }> {
  const session = await getServerSession(req, res, authOptions);

  if (!session) throw new UnauthorizedError();
  if (!session.isAdmin) throw new ForbiddenError(session.login);

  return { login: session.login ?? "unknown" };
}

type PageGuardResult =
  | { ok: false }
  | { ok: true; login: string };

/** Mesma regra para páginas: quem não é admin nem vê o painel, é redirecionado. */
export async function requireAdminPage(
  context: GetServerSidePropsContext,
): Promise<PageGuardResult> {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session?.isAdmin) return { ok: false };

  return { ok: true, login: session.login ?? "admin" };
}

export const ADMIN_LOGIN_REDIRECT = {
  redirect: { destination: "/admin/login", permanent: false },
} as const;
