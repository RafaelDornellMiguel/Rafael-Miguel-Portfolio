import "dotenv/config";
import cors from "cors";
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routers.js";
import { createContext } from "./_core/context.js";
import { ENV } from "./_core/env.js";
import { registerOAuthRoutes } from "./_core/oauth.js";
import { registerStorageProxy } from "./_core/storageProxy.js";

const app = express();
const port = Number(process.env.PORT) || 8080;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN ?? "http://localhost:8086",
    credentials: true,
  }),
);
app.use(express.json({ limit: "2mb" }));

registerStorageProxy(app);
registerOAuthRoutes(app);

app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    message: `Backend em http://localhost:${port}`,
  });
});

app.listen(port, () => {
  const storageMode =
    ENV.supabaseUrl && ENV.supabaseStorageBucket
      ? ENV.supabaseStoragePublic
        ? "Supabase (bucket público)"
        : ENV.supabaseServiceRoleKey
          ? "Supabase (URLs assinadas)"
          : "Supabase incompleto (falta SERVICE_ROLE ou PUBLIC)"
      : ENV.forgeApiUrl
        ? "Forge"
        : "desativado — configure Supabase ou Forge";
  console.log(
    `\x1b[32m[Backend]\x1b[0m http://localhost:${port}  |  tRPC /api/trpc  |  assets /assets-cloud  |  storage: ${storageMode}`,
  );
  console.log(
    `  CORS: ${process.env.CORS_ORIGIN ?? "http://localhost:8086"}  |  blog: dev.to via news.getLatest`,
  );
});
