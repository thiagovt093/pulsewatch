# 🔭 PulseWatch

Plataforma SaaS de monitoramento e observabilidade de APIs — construída com arquitetura de microsserviços, Clean Architecture e Java Spring Boot.

> Monitore suas APIs em tempo real, detecte falhas, meça latência e acompanhe o histórico de disponibilidade.

---

## 🎯 Sobre o Projeto

O PulseWatch foi desenvolvido como projeto de portfólio com foco em demonstrar arquitetura enterprise real, seguindo padrões utilizados em empresas SaaS e plataformas cloud.

Inspirado em plataformas como Datadog, UptimeRobot e New Relic.

---

## 🏗️ Arquitetura

```
pulsewatch/
 ├── auth-service/          Autenticação e identidade
 ├── monitoring-service/    Monitoramento de APIs
 ├── frontend/              Dashboard
 ├── incident-service/      (futuro)
 ├── notification-service/  (futuro)
 └── analytics-service/     (futuro)
```

Cada serviço possui:
- Banco de dados próprio
- Responsabilidade única
- Deploy independente
- Comunicação via JWT

---

## 🛠️ Stack

### Backend
- Java 21
- Spring Boot 4
- Spring Security 7
- Spring Data JPA
- Flyway
- PostgreSQL
- Maven

### Segurança
- JWT Authentication
- Refresh Tokens
- RBAC (Role Based Access Control)

### Infraestrutura
- Docker
- Docker Compose

---

## 🚀 Como Rodar

### Pré-requisitos
- Docker Desktop instalado e rodando

### 1. Clone o repositório

```bash
git clone https://github.com/thiagovt093/pulsewatch.git
cd pulsewatch
```

### 2. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DB_USERNAME=postgres
DB_PASSWORD=sua_senha
JWT_SECRET=sua_chave_secreta_longa_aqui
```

### 3. Suba os serviços

```bash
docker compose up --build
```

Isso vai subir automaticamente:
- PostgreSQL com os dois bancos criados
- auth-service na porta 8080
- monitoring-service na porta 8081

### 4. Rode o Frontend

```bash
npm run dev
```

Isso vai subir automaticamente:
- PostgreSQL com os dois bancos criados
- auth-service na porta 8080
- monitoring-service na porta 8081
- frontend na porta 3000
---

## 📡 Serviços

### Auth Service — porta 8080

Responsável por autenticação e identidade.

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/auth/register` | Cadastro de usuário |
| `POST` | `/auth/login` | Login |
| `POST` | `/auth/refresh` | Renovar JWT |
| `GET` | `/users/me` | Perfil autenticado |

### Monitoring Service — porta 8081

Responsável por monitoramento de APIs.

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/apis` | Cadastrar API |
| `GET` | `/apis` | Listar APIs |
| `GET` | `/apis/{id}` | Buscar API |
| `PUT` | `/apis/{id}` | Atualizar API |
| `PATCH` | `/apis/{id}` | Atualizar parcialmente |
| `DELETE` | `/apis/{id}` | Deletar API |
| `GET` | `/apis/{id}/history` | Histórico de checks |

---

## 🔄 Fluxo Principal

```
1. Usuário se cadastra e faz login → recebe JWT
        ↓
2. Cadastra uma API para monitorar
        ↓
3. Scheduler verifica a API a cada 60 segundos
        ↓
4. Sistema detecta status: UP / DOWN / DEGRADED
        ↓
5. Histórico disponível via API
```

---

## 📊 Status de Monitoramento

| Status | Descrição |
|---|---|
| `UP` | API respondendo normalmente |
| `DOWN` | API inacessível ou erro |
| `DEGRADED` | Latência acima do threshold (padrão 3000ms) |
| `PAUSED` | Monitoramento pausado |

---

## 🗺️ Roadmap

### Fase 1 — Backend ✅
- [x] auth-service
- [x] monitoring-service
- [x] Docker + Docker Compose

### Fase 2 — Frontend 🚧
- [x] Landing Page
- [ ] Dashboard React + TypeScript
- [ ] Login e cadastro
- [ ] Listagem de APIs monitoradas
- [ ] Gráficos de uptime e latência

### Fase 3 — Expansão ⬜
- [ ] incident-service
- [ ] notification-service (email, Discord, Telegram)
- [ ] analytics-service
- [ ] Redis cache
- [ ] Prometheus + Grafana

---

## 👨‍💻 Autor

Desenvolvido por **Thiago** como projeto de portfólio para vagas Java Backend / Spring Boot.

[![GitHub](https://img.shields.io/badge/GitHub-thiagovt093-black?logo=github)](https://github.com/thiagovt093)
