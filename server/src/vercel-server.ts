// server/src/vercel-server.ts
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import express from 'express';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from '../routers.js';
import { createContext } from '../_core/context.js';
import { registerOAuthRoutes } from '../_core/oauth.js';
import { registerStorageProxy } from '../_core/storageProxy.js';

const app = express();

// Configuração de CORS - já com a URL de produção
const allowedOrigins = [
  process.env.CORS_ORIGIN,
  'https://rafael-miguel-portfolio.vercel.app' // Seu domínio de produção
].filter(Boolean);

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json({ limit: '2mb' }));

// Registra suas rotas personalizadas
registerStorageProxy(app);
registerOAuthRoutes(app);

// Rota principal do tRPC
app.use('/api/trpc', createExpressMiddleware({ router: appRouter, createContext }));

// Rota de health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: `Backend rodando em modo serverless.` });
});

// Exporta o app para a Vercel
export default app;