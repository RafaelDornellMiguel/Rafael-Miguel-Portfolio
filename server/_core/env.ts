export const ENV = {
  /** URL do frontend em dev típico: http://localhost:8086 (OAuth redirect) */
  frontendUrl: process.env.FRONTEND_URL ?? "",
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
  /** Supabase Storage (bucket) — prioridade sobre Forge no proxy /assets-cloud */
  supabaseUrl: process.env.SUPABASE_URL ?? "",
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  supabaseStorageBucket: process.env.SUPABASE_STORAGE_BUCKET ?? "",
  /** Se "true", bucket público: redireciona sem assinar (não precisa service role) */
  supabaseStoragePublic:
    (process.env.SUPABASE_STORAGE_PUBLIC ?? "").toLowerCase() === "true",
  /** Prefixo opcional dentro do bucket, ex: `portfolio` → objeto `portfolio/gif_....mp4` */
  supabaseStorageKeyPrefix: (process.env.SUPABASE_STORAGE_KEY_PREFIX ?? "").replace(
    /^\/+|\/+$/g,
    "",
  ),
};
