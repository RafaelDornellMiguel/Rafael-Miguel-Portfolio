import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import type { Session } from "next-auth";
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

/** O painel só existe se todas as credenciais estiverem presentes. */
export function isAuthConfigured(): boolean {
  return Boolean(
    process.env.NEXTAUTH_SECRET && process.env.GITHUB_ID && process.env.GITHUB_SECRET,
  );
}

/**
 * Lê a sessão sem nunca propagar exceção.
 *
 * Se a autenticação não estiver configurada, getServerSession lança — e uma
 * exceção aqui viraria 500 opaco, escondendo que o problema é de configuração.
 * Falta de configuração é ausência de sessão: nega o acesso com resposta limpa.
 */
async function readSession(
  req: NextApiRequest | GetServerSidePropsContext["req"],
  res: NextApiResponse | GetServerSidePropsContext["res"],
): Promise<Session | null> {
  if (!isAuthConfigured()) {
    console.warn(
      JSON.stringify({
        level: "warn",
        scope: "AUTH:GUARD",
        error_location_code: "AUTH:GUARD:NOT_CONFIGURED",
        message: "Painel indisponível: faltam NEXTAUTH_SECRET, GITHUB_ID ou GITHUB_SECRET.",
      }),
    );
    return null;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- assinaturas de API e de página
    return await getServerSession(req as any, res as any, authOptions);
  } catch (cause) {
    console.error(
      JSON.stringify({
        level: "error",
        scope: "AUTH:GUARD",
        error_location_code: "AUTH:GUARD:SESSION_UNAVAILABLE",
        message: cause instanceof Error ? cause.message : "erro desconhecido ao ler a sessão",
      }),
    );
    return null;
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
  const session = await readSession(req, res);

  if (!session) throw new UnauthorizedError();
  if (!session.isAdmin) throw new ForbiddenError(session.login);

  return { login: session.login ?? "unknown" };
}

type PageGuardResult = { ok: false } | { ok: true; login: string };

/** Mesma regra para páginas: quem não é admin nem vê o painel, é redirecionado. */
export async function requireAdminPage(
  context: GetServerSidePropsContext,
): Promise<PageGuardResult> {
  const session = await readSession(context.req, context.res);

  if (!session?.isAdmin) return { ok: false };

  return { ok: true, login: session.login ?? "admin" };
}

export const ADMIN_LOGIN_REDIRECT = {
  redirect: { destination: "/admin/login", permanent: false },
} as const;
