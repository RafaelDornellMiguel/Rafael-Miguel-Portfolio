import { createApiHandler } from "@/lib/api/handler";
import { isDatabaseConfigured } from "@/lib/db/client";

/** Health check para monitoramento externo. Sem dado interno sensível. */
export default createApiHandler({
  GET: async (_req, res) => {
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({
      status: "ok",
      updated_at: new Date().toISOString(),
      dependencies: {
        database: isDatabaseConfigured() ? "configured" : "not_configured",
      },
    });
  },
});
