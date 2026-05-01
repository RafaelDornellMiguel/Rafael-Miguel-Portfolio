# Rafael Portfolio - Nova Identidade Visual (V3)

Este projeto é o portfólio profissional de **Rafael Dornell Miguel**, focado em Engenharia de Dados e Desenvolvimento de Sistemas. A versão atual conta com uma identidade visual moderna inspirada no GitHub e curso.dev.

## 🚀 Tecnologias Utilizadas

- **Frontend**: React, Vite, Tailwind CSS v4, Wouter, AOS (Animate on Scroll).
- **Backend**: Node.js, Express, tRPC, Drizzle ORM.
- **Banco de Dados**: PostgreSQL (Supabase).
- **Acessibilidade**: Foco em semântica HTML5 e suporte a leitores de tela.

---

## 🛠️ Como Rodar o Projeto

O projeto é dividido em `client` (Frontend) e `server` (Backend).

### 1. Pré-requisitos
Certifique-se de ter o **Node.js** e o **pnpm** (ou npm/yarn) instalados.

### 2. Configuração do Backend
1. Entre na pasta `server`:
   ```bash
   cd server
   ```
2. Instale as dependências:
   ```bash
   pnpm install
   ```
3. Configure o arquivo `.env` com suas credenciais do Supabase (use o `.env.example` como base).
4. Inicie o servidor:
   ```bash
   pnpm run dev
   ```
   *O backend rodará em `http://localhost:8080`*

### 3. Configuração do Frontend
1. Em um novo terminal, entre na pasta `client`:
   ```bash
   cd client
   ```
2. Instale as dependências:
   ```bash
   pnpm install
   ```
3. Inicie o projeto:
   ```bash
   pnpm run dev
   ```
   *O frontend rodará em `http://localhost:8086`*

---

## ✨ Melhorias da Nova Versão

1. **Repaginação Visual**: Nova paleta de cores, tipografia Poppins e layout inspirado em plataformas de tecnologia.
2. **Acessibilidade (Auditada)**:
   - Uso de `fieldset` e `legend` em formulários.
   - Melhora na navegação via teclado (Focus rings).
   - Atributos `aria-*` em modais e componentes interativos.
3. **Responsividade**:
   - Layout fluido para mobile, tablet e desktop.
   - Menu mobile otimizado.
4. **Performance**:
   - Pre-carregamento de assets críticos.
   - Separação clara entre lógica de negócio (Backend) e interface (Frontend).

---

## 📁 Estrutura de Pastas

- `/client`: Interface React e componentes UI.
- `/server`: API tRPC, Banco de Dados e lógica de servidor.
- `/shared`: Constantes e tipos compartilhados.

---

Desenvolvido por **Rafael Dornell Miguel**.
