import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import express from 'express';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from '../server/routers.js';
import { createContext } from '../server/_core/context.js';

const app = express();

const allowedOrigins = [
  process.env.CORS_ORIGIN,
  'https://rafael-miguel-portfolio.vercel.app',
].filter(Boolean) as string[];

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json({ limit: '2mb' }));

app.use('/api/trpc', createExpressMiddleware({ router: appRouter, createContext }));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

export default app;
