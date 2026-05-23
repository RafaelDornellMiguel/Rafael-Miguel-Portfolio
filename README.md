# Rafael Dornell Miguel — Portfólio

Portfólio pessoal de **Rafael Dornell Miguel**, desenvolvedor de software e engenheiro de dados especializado em ETL, pipelines de dados e automação.

🔗 **Live:** [rafael-miguel-portfolio.vercel.app](https://rafael-miguel-portfolio.vercel.app)

---

## Stack

| Camada   | Tecnologia                                          |
|----------|-----------------------------------------------------|
| Frontend | React 18, Vite 5, Tailwind CSS, Wouter              |
| API      | tRPC v10, Express, Zod                              |
| Banco    | PostgreSQL (Supabase) + Drizzle ORM                 |
| Deploy   | Vercel (SPA estático + Serverless Function)         |
| Blog     | DEV.to API (artigos em tempo real)                  |

---

## Estrutura

```
portfolio/
├── api/
│   └── [...path].ts        # Serverless function Vercel (entrada da API)
├── client/
│   ├── public/             # Assets estáticos (imagens, vídeos)
│   └── src/
│       ├── components/     # Header, Hero, About, Services, Projects, News, Contact, Footer
│       ├── pages/          # Blog
│       ├── hooks/
│       ├── i18n/           # Localização PT-BR / EN
│       └── lib/trpc.ts     # Cliente tRPC tipado
├── server/
│   ├── _core/              # tRPC setup, contexto, auth, env
│   ├── drizzle/            # Schema e migrations
│   ├── routers/            # news.ts (DEV.to)
│   ├── routers.ts          # AppRouter agregado
│   ├── db.ts               # Conexão PostgreSQL (lazy)
│   └── index.ts            # Dev server local
├── shared/                 # Constantes compartilhadas (frontend + backend)
└── vercel.json             # Configuração de build e rewrites
```

---

## Desenvolvimento local

**Pré-requisitos:** Node.js 20, npm

```bash
# 1. Instalar dependências
npm install
npm install --prefix client
npm install --prefix server

# 2. Configurar variáveis de ambiente do backend
cp server/.env.example server/.env
# Preencher: DATABASE_URL, JWT_SECRET

# 3. Rodar frontend + backend em paralelo
npm run dev
# Frontend: http://localhost:8086
# Backend:  http://localhost:8080
```

---

## Deploy (Vercel)

O backend é servido pela [serverless function](./api/%5B...path%5D.ts).
O frontend é gerado como SPA estática (`client/dist`).

Variáveis de ambiente necessárias no painel Vercel:

| Variável       | Descrição                      |
|----------------|--------------------------------|
| `DATABASE_URL` | Connection string do Supabase  |
| `JWT_SECRET`   | Secret para tokens de sessão   |

```bash
# Build local (opcional — Vercel faz automaticamente)
npm run build

# Deploy: push para main dispara deploy automático via Vercel Git Integration
git push origin main
```

---

## Funcionalidades

- **Blog** — artigos em tempo real via DEV.to API, filtro por tag e paginação
- **Contato** — formulário com persistência em PostgreSQL + fallback para WhatsApp
- **i18n** — PT-BR e EN
- **Tema** — dark / light mode
- **SEO** — meta tags, Open Graph, sitemap, robots.txt, Schema.org structured data
- **Performance** — lazy loading, preload de assets críticos, Service Worker offline
