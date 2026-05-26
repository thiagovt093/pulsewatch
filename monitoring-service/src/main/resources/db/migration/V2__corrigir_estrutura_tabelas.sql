-- V2__corrigir_estrutura_tabelas.sql

-- =====================================================
-- 1. CORRIGIR TABELA monitored_apis
-- =====================================================

-- Adicionar coluna current_status que estava faltando
ALTER TABLE monitored_apis
ADD COLUMN IF NOT EXISTS current_status VARCHAR(30);

-- Modificar colunas existentes para os tipos corretos
ALTER TABLE monitored_apis
ALTER COLUMN name TYPE VARCHAR(100),
ALTER COLUMN url TYPE VARCHAR(500),
ALTER COLUMN method TYPE VARCHAR(20),
ALTER COLUMN check_interval SET NOT NULL,
ALTER COLUMN timeout SET NOT NULL;

-- Remover a constraint NOT NULL do active se existir (para permitir DEFAULT)
ALTER TABLE monitored_apis
ALTER COLUMN active DROP NOT NULL;

-- Definir valor padrão para active
ALTER TABLE monitored_apis
ALTER COLUMN active SET DEFAULT TRUE;

-- =====================================================
-- 2. CORRIGIR TABELA monitoring_checks
-- =====================================================

-- Adicionar coluna error_message que estava faltando
ALTER TABLE monitoring_checks
ADD COLUMN IF NOT EXISTS error_message TEXT;

-- Alterar tipo do response_time para BIGINT (maior capacidade)
ALTER TABLE monitoring_checks
ALTER COLUMN response_time TYPE BIGINT;

-- Remover NOT NULL temporariamente de algumas colunas
ALTER TABLE monitoring_checks
ALTER COLUMN response_time DROP NOT NULL,
ALTER COLUMN status_code DROP NOT NULL,
ALTER COLUMN success DROP NOT NULL;

-- =====================================================
-- 3. CORRIGIR TABELA health_events
-- =====================================================

-- Renomear constraint duplicada (evitar conflito)
ALTER TABLE health_events DROP CONSTRAINT IF EXISTS fk_check_api;
ALTER TABLE health_events
ADD CONSTRAINT fk_health_events_api
FOREIGN KEY (api_id) REFERENCES monitored_apis(id) ON DELETE CASCADE;

-- Ajustar tamanho do message
ALTER TABLE health_events
ALTER COLUMN message TYPE TEXT;

-- =====================================================
-- 4. ATUALIZAR DADOS EXISTENTES (se houver)
-- =====================================================

-- Definir current_status baseado em dados existentes (exemplo)
UPDATE monitored_apis
SET current_status = 'UNKNOWN'
WHERE current_status IS NULL;

-- Definir valores padrão para registros existentes
UPDATE monitoring_checks
SET error_message = NULL
WHERE error_message IS NULL;

-- =====================================================
-- 5. RECRIAR CONSTRAINTS (se necessário)
-- =====================================================

-- Garantir que success seja NOT NULL após definir valores
ALTER TABLE monitoring_checks
ALTER COLUMN success SET NOT NULL;