# Rafael Dornell Miguel — Portfólio

Portfólio pessoal de **(Meu)Rafael Dornell Miguel**

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
│   └── [...path].mts       # Serverless function Vercel (entrada da API)
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
│   └── db.ts               # Conexão PostgreSQL (lazy)
├── shared/                 # Constantes compartilhadas (frontend + backend)
└── vercel.json             # Configuração de build e rewrites
```

---

## Funcionalidades

- **Blog** — artigos em tempo real via DEV.to API, filtro por tag e paginação
- **Contato** — formulário com persistência em PostgreSQL + fallback para WhatsApp
- **i18n** — PT-BR e EN
- **Tema** — dark / light mode
- **SEO** — meta tags, Open Graph, sitemap, robots.txt, Schema.org structured data
- **Performance** — lazy loading, preload de assets críticos, Service Worker offline
