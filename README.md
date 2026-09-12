# Portfólio — Rafael Dornell Miguel

Portfólio reconstruído do zero em **Next.js (Pages Router)**, com shell estático (SSG),
API REST versionada em `/api/v1/` e erros estruturados.

A referência arquitetural é o stack do TabNews/curso.dev: shell pré-renderizado no build,
dados dinâmicos chegando por API depois, conteúdo como dado e erro como objeto de primeira classe.

## Stack

| Camada        | Escolha                                  | Por quê                                                |
| ------------- | ---------------------------------------- | ------------------------------------------------------ |
| Framework     | Next.js 16 (Pages Router)                | SSG do shell + API routes no mesmo projeto             |
| Linguagem     | TypeScript `strict`                      | Erro de tipo antes do deploy                           |
| Estilo        | CSS Modules + tokens                     | Escopo total por componente, zero vazamento de classe  |
| Tema          | Dark nativo + claro opcional             | Tokens em `src/styles/tokens.css`, sem cor literal     |
| API           | `/api/v1/*` com erros estruturados       | Contrato estável e rastreável                          |
| Persistência  | Postgres via `pg`, query parametrizada   | Um INSERT não justifica um ORM                         |
| Validação     | Zod na borda                             | Nada entra sem passar por schema                       |

## Arquitetura

```
src/
  content/      dados do site (perfil, serviços, projetos, experiência)
  pages/        rotas (SSG) + /api/v1 (contact, news, status)
  components/   componentes + CSS Module ao lado de cada um
  lib/api/      erros estruturados, handler, rate limit, cliente fetch
  lib/db/       pool Postgres com TLS verificado
  i18n/         dicionários pt/en + provider
  styles/       tokens e estilos globais
```

**Conteúdo é dado, não JSX.** Adicionar projeto, serviço ou experiência é editar um
arquivo em `src/content/` — nenhum componente muda.

### Erros estruturados

Toda falha da API chega ao cliente no mesmo formato:

```json
{
  "name": "ValidationError",
  "message": "Os dados enviados não passaram na validação.",
  "action": "Informe nome (2–120), WhatsApp (8–20) e uma descrição com pelo menos 10 caracteres.",
  "status_code": 400,
  "error_id": "ee1451e0-…",
  "request_id": "3568a539-…",
  "error_location_code": "API:V1:CONTACT:INVALID_BODY"
}
```

`message` e `action` são para o usuário. `error_location_code` aponta a origem exata no código.
`request_id` (também no header `x-request-id`) correlaciona a resposta com o log do servidor.
Stack trace, causa e contexto interno ficam **apenas** no log — nunca na resposta HTTP.

### Endpoints

| Rota                 | Método | O que faz                                              |
| -------------------- | ------ | ------------------------------------------------------ |
| `/api/v1/status`     | GET    | Health check para monitoramento                        |
| `/api/v1/news`       | GET    | Artigos do DEV.to (tag em allowlist, cache de 5 min)   |
| `/api/v1/contact`    | POST   | Recebe o lead, valida, persiste e devolve `persisted`  |

Método não declarado responde **405** — fail-closed por padrão.

### Controles de segurança aplicados

- Validação com Zod em toda entrada; `tag` de terceiros restrita a allowlist.
- Rate limiting por IP: 3 envios / 10 min no contato, 60 req/min nas notícias.
- Limite de payload (8 kb) e timeout em toda I/O (banco 5 s, DEV.to 8 s).
- SQL sempre parametrizado — zero concatenação de entrada.
- TLS do banco verificado sempre; CA própria entra por `DATABASE_CA_CERT`.
- Headers `X-Content-Type-Options`, `X-Frame-Options` e `Referrer-Policy` no `next.config.js`.
- Log de auditoria do lead sem dado pessoal (só serviço e resultado).

## Rodando local

```bash
npm install
cp .env.example .env.local   # opcional: só para persistir leads
npm run dev                  # http://localhost:3000
```

Outros comandos:

```bash
npm run build      # build de produção
npm run typecheck  # tsc --noEmit
```

## Variáveis de ambiente

| Variável           | Obrigatória | Papel                                                      |
| ------------------ | ----------- | ---------------------------------------------------------- |
| `DATABASE_URL`     | não         | Postgres dos leads. Ausente = API responde `persisted:false` |
| `DATABASE_CA_CERT` | não         | CA própria do banco, em PEM                                  |

Nenhum segredo vive no código. A tabela esperada é `contacts (name, email, phone, subject, message)`.

## Deploy

Vercel detecta o Next.js automaticamente — sem `vercel.json`. Configure as variáveis
de ambiente no projeto antes do primeiro deploy.
