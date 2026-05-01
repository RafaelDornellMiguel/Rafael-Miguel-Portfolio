// api/[...path].ts
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import express from 'express';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from '../server/routers';
import { createContext } from '../server/_core/context';
import { registerOAuthRoutes } from '../server/_core/oauth';
import { registerStorageProxy } from '../server/_core/storageProxy';

const app = express();

const allowedOrigins = [
  process.env.CORS_ORIGIN,
  'https://rafael-miguel-portfolio.vercel.app'
].filter(Boolean);

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json({ limit: '2mb' }));

registerStorageProxy(app);
registerOAuthRoutes(app);

app.use('/api/trpc', createExpressMiddleware({ router: appRouter, createContext }));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Backend serverless no ar.' });
});

export default app;