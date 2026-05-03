# 🎯 FINALIZAÇÃO DO DEPLOY - 2 PASSOS RESTANTES

## ⚡ PASSO 1: Criar Projeto Supabase (5 minutos)

1. **Acessar**: https://supabase.com
2. **Sign Up/Login** com GitHub
3. **New Project** → "Create new project"
4. **Configurar**:
   - Organization: Seu nome
   - Project Name: `portfolio-backend`
   - Database Password: Criar senha forte
   - Region: Mais próxima de você
5. **Wait for deployment** (~2 min)
6. **Copiar credenciais**:
   - Project URL: `https://xxx.supabase.co`
   - anon public: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## ⚡ PASSO 2: Configurar e Deploy (10 minutos)

### 2.1 Configurar Frontend
Criar arquivo `client/.env.local`:
```bash
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=SUA-CHAVE-ANON
```

### 2.2 Deploy Frontend
```bash
npx vercel --prod
```

### 2.3 Deploy Backend (via painel Supabase)
1. No painel Supabase → Edge Functions
2. Upload as functions da pasta `supabase/functions/`
3. Deploy `health` e `trpc`

## 🎉 RESULTADO FINAL
- **Frontend**: https://seu-portfolio.vercel.app
- **Backend**: https://xxx.supabase.co/functions/v1/health
- **Portfolio 100% funcional e profissional!**

## 🔧 TESTE LOCAL (Opcional)
```bash
# Terminal 1
cd client && npm run dev

# Acessar http://localhost:8086
```

**ESTAMOS A 15 MINUTOS DE TERMINAR! 🚀**
