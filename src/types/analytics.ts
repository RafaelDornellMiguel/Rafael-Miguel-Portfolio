export type Breakdown = { label: string; views: number };

export type AnalyticsSummary = {
  days: number;
  totals: { views: number; visitors: number };
  daily: { day: string; views: number; visitors: number }[];
  paths: Breakdown[];
  referrers: Breakdown[];
  devices: Breakdown[];
  countries: Breakdown[];
  databaseConfigured: boolean;
};
