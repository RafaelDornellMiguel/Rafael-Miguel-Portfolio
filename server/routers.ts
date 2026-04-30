import { COOKIE_NAME } from "./appShared.js";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { createContact, getContacts } from "./db";
import { newsRouter } from "./routers/news";
import { z } from "zod";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  contact: router({
    create: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Nome é obrigatório"),
          email: z.string().email("Email inválido"),
          phone: z.string().optional(),
          subject: z.string().min(1, "Assunto é obrigatório"),
          message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
        })
      )
      .mutation(async ({ input }) => {
        try {
          await createContact(input);
          return { success: true, message: "Mensagem enviada com sucesso!" };
        } catch (error) {
          console.error("Erro ao criar contato:", error);
          throw new Error("Erro ao enviar mensagem");
        }
      }),
    list: publicProcedure.query(async () => {
      try {
        return await getContacts();
      } catch (error) {
        console.error("Erro ao listar contatos:", error);
        return [];
      }
    }),
  }),
  news: newsRouter,
});

export type AppRouter = typeof appRouter;
