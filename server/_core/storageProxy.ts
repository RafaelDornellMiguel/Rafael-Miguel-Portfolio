import type { Express, Response } from "express";
import { createClient } from "@supabase/supabase-js";
import { ENV } from "./env";

function storageObjectPath(key: string): string {
  const cleanKey = key.replace(/^\/+/, "");
  if (!ENV.supabaseStorageKeyPrefix) return cleanKey;
  return `${ENV.supabaseStorageKeyPrefix}/${cleanKey}`;
}

function supabasePublicObjectUrl(objectPath: string): string {
  const base = ENV.supabaseUrl.replace(/\/+$/, "");
  const bucket = ENV.supabaseStorageBucket;
  const encoded = objectPath
    .split("/")
    .map((seg) => encodeURIComponent(seg))
    .join("/");
  return `${base}/storage/v1/object/public/${bucket}/${encoded}`;
}

async function redirectSupabaseSigned(res: Response, objectPath: string): Promise<void> {
  const supabase = createClient(
    ENV.supabaseUrl,
    ENV.supabaseServiceRoleKey,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );

  const { data, error } = await supabase.storage
    .from(ENV.supabaseStorageBucket)
    .createSignedUrl(objectPath, 3600);

  if (error || !data?.signedUrl) {
    console.error("[StorageProxy] Supabase signed URL:", error?.message ?? "empty url");
    res.status(502).send("Storage signed URL failed");
    return;
  }

  res.set("Cache-Control", "no-store");
  res.redirect(307, data.signedUrl);
}

async function redirectForge(res: Response, key: string): Promise<void> {
  const forgeUrl = new URL(
    "v1/storage/presign/get",
    ENV.forgeApiUrl.replace(/\/+$/, "") + "/",
  );
  forgeUrl.searchParams.set("path", key);

  const forgeResp = await fetch(forgeUrl, {
    headers: { Authorization: `Bearer ${ENV.forgeApiKey}` },
  });

  if (!forgeResp.ok) {
    const body = await forgeResp.text().catch(() => "");
    console.error(`[StorageProxy] forge error: ${forgeResp.status} ${body}`);
    res.status(502).send("Storage backend error");
    return;
  }

  const { url } = (await forgeResp.json()) as { url: string };
  if (!url) {
    res.status(502).send("Empty signed URL from backend");
    return;
  }

  res.set("Cache-Control", "no-store");
  res.redirect(307, url);
}

export function registerStorageProxy(app: Express) {
  app.get("/assets-cloud/*", async (req, res) => {
    const key = (req.params as Record<string, string>)[0];
    if (!key) {
      res.status(400).send("Missing storage key");
      return;
    }

    try {
      const useSupabase =
        ENV.supabaseUrl &&
        ENV.supabaseStorageBucket &&
        (ENV.supabaseStoragePublic || ENV.supabaseServiceRoleKey);

      if (useSupabase) {
        const objectPath = storageObjectPath(key);

        if (ENV.supabaseStoragePublic) {
          const url = supabasePublicObjectUrl(objectPath);
          res.set("Cache-Control", "public, max-age=3600");
          res.redirect(307, url);
          return;
        }

        if (!ENV.supabaseServiceRoleKey) {
          res
            .status(503)
            .send(
              "Bucket Supabase privado: defina SUPABASE_SERVICE_ROLE_KEY ou use SUPABASE_STORAGE_PUBLIC=true.",
            );
          return;
        }

        await redirectSupabaseSigned(res, objectPath);
        return;
      }

      if (ENV.forgeApiUrl && ENV.forgeApiKey) {
        await redirectForge(res, key);
        return;
      }

      res
        .status(503)
        .send(
          "Storage não configurado. Defina SUPABASE_URL, SUPABASE_STORAGE_BUCKET e SUPABASE_STORAGE_PUBLIC=true ou SUPABASE_SERVICE_ROLE_KEY no .env do servidor.",
        );
    } catch (err) {
      console.error("[StorageProxy] failed:", err);
      res.status(502).send("Storage proxy error");
    }
  });
}
