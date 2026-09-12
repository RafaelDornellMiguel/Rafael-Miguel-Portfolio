import { z } from "zod";

import { requireAdmin } from "@/lib/auth/guard";
import { createApiHandler } from "@/lib/api/handler";
import { isDatabaseConfigured, query } from "@/lib/db/client";
import type { AnalyticsSummary } from "@/types/analytics";

const querySchema = z.object({
  days: z.coerce.number().int().min(1).max(90).default(30),
});

export default createApiHandler({
  GET: async (req, res) => {
    // Autorização antes de qualquer leitura de dado.
    await requireAdmin(req, res);

    const { days } = querySchema.parse(req.query);
    const since = `${days} days`;

    if (!isDatabaseConfigured()) {
      res.status(200).json({
        days,
        totals: { views: 0, visitors: 0 },
        daily: [],
        paths: [],
        referrers: [],
        devices: [],
        countries: [],
        databaseConfigured: false,
      } satisfies AnalyticsSummary);
      return;
    }

    const [totals, daily, paths, referrers, devices, countries] = await Promise.all([
      query<{ views: string; visitors: string }>(
        `SELECT COUNT(*) AS views, COUNT(DISTINCT visitor_hash) AS visitors
           FROM page_views WHERE created_at >= now() - $1::interval`,
        [since],
      ),
      query<{ day: string; views: string; visitors: string }>(
        `SELECT to_char(date_trunc('day', created_at), 'YYYY-MM-DD') AS day,
                COUNT(*) AS views,
                COUNT(DISTINCT visitor_hash) AS visitors
           FROM page_views WHERE created_at >= now() - $1::interval
          GROUP BY 1 ORDER BY 1`,
        [since],
      ),
      query<{ label: string; views: string }>(
        `SELECT path AS label, COUNT(*) AS views
           FROM page_views WHERE created_at >= now() - $1::interval
          GROUP BY 1 ORDER BY 2 DESC LIMIT 10`,
        [since],
      ),
      query<{ label: string; views: string }>(
        `SELECT COALESCE(referrer_host, 'direto') AS label, COUNT(*) AS views
           FROM page_views WHERE created_at >= now() - $1::interval
          GROUP BY 1 ORDER BY 2 DESC LIMIT 10`,
        [since],
      ),
      query<{ label: string; views: string }>(
        `SELECT device AS label, COUNT(*) AS views
           FROM page_views WHERE created_at >= now() - $1::interval
          GROUP BY 1 ORDER BY 2 DESC`,
        [since],
      ),
      query<{ label: string; views: string }>(
        `SELECT COALESCE(country, '??') AS label, COUNT(*) AS views
           FROM page_views WHERE created_at >= now() - $1::interval
          GROUP BY 1 ORDER BY 2 DESC LIMIT 10`,
        [since],
      ),
    ]);

    const toBreakdown = (rows: { label: string; views: string }[]) =>
      rows.map((row) => ({ label: row.label, views: Number(row.views) }));

    const body: AnalyticsSummary = {
      days,
      totals: {
        views: Number(totals[0]?.views ?? 0),
        visitors: Number(totals[0]?.visitors ?? 0),
      },
      daily: daily.map((row) => ({
        day: row.day,
        views: Number(row.views),
        visitors: Number(row.visitors),
      })),
      paths: toBreakdown(paths),
      referrers: toBreakdown(referrers),
      devices: toBreakdown(devices),
      countries: toBreakdown(countries),
      databaseConfigured: true,
    };

    res.setHeader("Cache-Control", "no-store");
    res.status(200).json(body);
  },
});
