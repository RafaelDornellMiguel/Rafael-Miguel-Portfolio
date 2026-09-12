import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

/**
 * Autorização por allowlist de um único usuário.
 *
 * Autenticar não basta: qualquer pessoa com conta no GitHub passa pelo provedor.
 * Quem decide o acesso é a comparação com ADMIN_GITHUB_LOGIN, feita no servidor.
 * Sem a variável configurada, ninguém entra — falha fechada, nunca aberta.
 */
function isAllowedLogin(login: unknown): boolean {
  const allowed = process.env.ADMIN_GITHUB_LOGIN?.trim().toLowerCase();
  if (!allowed) return false;
  return typeof login === "string" && login.trim().toLowerCase() === allowed;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],

  // Sessão em JWT assinado no cookie: não há tabela de sessão para vazar.
  session: { strategy: "jwt", maxAge: 8 * 60 * 60 },

  callbacks: {
    signIn({ profile }) {
      const login = (profile as { login?: unknown } | undefined)?.login;
      const allowed = isAllowedLogin(login);

      console.info(
        JSON.stringify({
          level: allowed ? "info" : "warn",
          scope: "AUTH:SIGN_IN",
          event: allowed ? "admin_login_granted" : "admin_login_denied",
          // Trilha de auditoria: tentativa negada também é registrada.
          login: typeof login === "string" ? login : "unknown",
        }),
      );

      return allowed;
    },

    jwt({ token, profile }) {
      if (profile) {
        token.login = (profile as { login?: string }).login;
        token.isAdmin = isAllowedLogin((profile as { login?: unknown }).login);
      }
      return token;
    },

    session({ session, token }) {
      // Revalida a allowlist na leitura: revogar o acesso é editar a env,
      // sem depender de o token antigo expirar.
      session.isAdmin = token.isAdmin === true && isAllowedLogin(token.login);
      session.login = typeof token.login === "string" ? token.login : null;
      return session;
    },
  },

  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
};
