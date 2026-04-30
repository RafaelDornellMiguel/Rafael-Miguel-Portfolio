# Rafael Portfolio - Versão Otimizada (V3)

Esta versão foi reestruturada seguindo os padrões de mercado, separando o **Frontend** do **Backend** para maior performance e organização.

## 🚀 Arquitetura
- **Frontend**: React + Vite + Tailwind (Porta `8086`)
- **Backend**: Node.js + Express + Drizzle ORM (Porta `8080`)
- **Banco de Dados**: PostgreSQL (Supabase)
- **Storage**: Supabase Storage (Proxy de imagens configurado)

---

## 🛠️ Como Rodar o Projeto

Você precisará de **dois terminais** abertos simultaneamente.

### 1. Configuração do Backend
Abra o primeiro terminal na pasta `server`:
```bash
cd server
pnpm install
pnpm run dev
```
> O backend estará rodando em: `http://localhost:8080`

### 2. Configuração do Frontend
Abra o segundo terminal na pasta `client`:
```bash
cd client
pnpm install
pnpm run dev
```
> O frontend estará rodando em: `http://localhost:8086`

---

## 📁 Estrutura de Pastas
- `/client`: Todo o código da interface (React).
- `/server`: Toda a lógica de servidor, banco de dados e proxy de imagens.
- `/shared`: Tipagens e constantes compartilhadas entre os dois.

## 🔒 Variáveis de Ambiente (.env)
Certifique-se de que o arquivo `server/.env` contém suas chaves do Supabase:
- `DATABASE_URL`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_BUCKET_NAME`

---

## ✨ Melhorias Realizadas
1. **Desacoplamento**: Front e Back agora são independentes.
2. **Proxy de Imagens**: O frontend pede imagens para o backend na porta 8080, que busca no Supabase.
3. **Performance**: O Vite agora roda de forma limpa sem o peso do servidor Node no mesmo processo.
4. **Limpeza**: Removido qualquer rastro de ferramentas de IA na estrutura de pastas.
