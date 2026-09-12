-- Migração 0001 — monitoramento de acessos
--
-- Decisão de privacidade (LGPD por design):
--   * Nenhum IP bruto é gravado. O visitante é identificado por um hash que
--     combina IP + user-agent + um sal secreto que TROCA A CADA DIA.
--     Consequência: o mesmo visitante tem hash diferente amanhã, então não há
--     como montar histórico de navegação de uma pessoa, e o hash não volta a
--     ser IP (sal secreto + rotação diária).
--   * Nenhum cookie é criado — por isso o site não precisa de banner de consentimento.
--   * `referrer_host` guarda só o domínio de origem, nunca a URL completa
--     (URL completa costuma carregar termo de busca e parâmetro pessoal).
--   * Minimização: nada de user-agent cru, nada de fingerprint de tela.
--   * Retenção: 90 dias. A rotina de limpeza está no fim deste arquivo.

CREATE TABLE IF NOT EXISTS page_views (
  id            BIGSERIAL PRIMARY KEY,
  path          VARCHAR(120)  NOT NULL,
  referrer_host VARCHAR(255),
  country       CHAR(2),
  device        VARCHAR(16)   NOT NULL DEFAULT 'unknown',
  -- sha256 truncado de (ip + user-agent + sal do dia). Pseudônimo de vida curta.
  visitor_hash  CHAR(32)      NOT NULL,
  created_at    TIMESTAMPTZ   NOT NULL DEFAULT now()
);

-- Consultas do painel são sempre por janela de tempo.
CREATE INDEX IF NOT EXISTS page_views_created_at_idx ON page_views (created_at DESC);

-- "Visitantes únicos por dia" sem varrer a tabela inteira.
CREATE INDEX IF NOT EXISTS page_views_visitor_day_idx
  ON page_views (visitor_hash, created_at DESC);

-- Ranking de páginas mais vistas.
CREATE INDEX IF NOT EXISTS page_views_path_idx ON page_views (path, created_at DESC);

-- ─────────────────────────────────────────────────────────────────────────────
-- Retenção: execute periodicamente (pg_cron no Supabase, ou manualmente).
-- Dado de acesso com mais de 90 dias não serve ao propósito declarado.
--
--   DELETE FROM page_views WHERE created_at < now() - INTERVAL '90 days';
--
-- Para agendar no Supabase (extensão pg_cron habilitada):
--
--   SELECT cron.schedule(
--     'limpa-page-views',
--     '0 4 * * *',
--     $$DELETE FROM page_views WHERE created_at < now() - INTERVAL '90 days'$$
--   );
-- ─────────────────────────────────────────────────────────────────────────────
