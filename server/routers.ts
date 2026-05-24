import { publicProcedure, router } from "./_core/trpc";
import { createContact, getContacts } from "./db";
import { newsRouter } from "./routers/news";
import { z } from "zod";

/**
 * Portfolio router — only public procedures needed.
 * Auth/system/admin routes removed from Lambda entry to avoid
 * pulling oauth/sdk/axios into the serverless bundle.
 */
export const appRouter = router({
  contact: router({
    create: publicProcedure
      .input(
        z.object({
          name:    z.string().min(1, "Nome é obrigatório"),
          email:   z.string().email("Email inválido"),
          phone:   z.string().optional(),
          subject: z.string().min(1, "Assunto é obrigatório"),
          message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
        }),
      )
      .mutation(async ({ input }) => {
        try {
          await createContact(input);
        } catch {
          console.warn("[Contact] DB indisponível — lead logado:", {
            name: input.name,
            subject: input.subject,
          });
        }
        return { success: true, message: "Mensagem enviada com sucesso!" };
      }),

    list: publicProcedure.query(async () => {
      try {
        return await getContacts();
      } catch {
        return [];
      }
    }),
  }),

  news: newsRouter,
});

export type AppRouter = typeof appRouter;
