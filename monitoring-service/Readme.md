# 📡 Monitoring Service — PulseWatch

Microsserviço de monitoramento e observabilidade da plataforma **PulseWatch** — uma plataforma SaaS de monitoramento de APIs.

---

## 📌 Sobre

O `monitoring-service` é responsável por monitorar APIs cadastradas pelos usuários, detectar falhas, medir latência e registrar o histórico de disponibilidade.

### Responsabilidades

- Cadastro de APIs para monitoramento
- Verificação automática de disponibilidade via scheduler
- Medição de tempo de resposta
- Detecção de status (UP, DOWN, DEGRADED)
- Registro de checks e eventos de saúde
- Histórico de verificações

---

## 🛠️ Stack

| Tecnologia | Uso |
|---|---|
| Java 21 | Linguagem |
| Spring Boot 4 | Framework |
| Spring Security 7 | Validação JWT |
| Spring Data JPA | Persistência |
| Spring Scheduler | Monitoramento automático |
| PostgreSQL | Banco de dados |
| Flyway | Migrations |
| RestClient | Cliente HTTP para checks |
| Lombok | Redução de boilerplate |
| Maven | Build |

---

## 🏗️ Arquitetura

```
src/main/java/com/pulsewatch/monitoring
│
├── api/                      # Controllers (entrada HTTP)
├── application/
│   ├── usecases/             # Casos de uso (lógica de negócio)
│   └── scheduler/            # Scheduler de monitoramento
│        ├── ApiScheduler     # Dispara o ciclo de checks
│        └── ApiCheckService  # Executa e persiste cada check
├── domain/
│   ├── entity/               # Entidades
│   ├── enums/                # Enumerações
│   └── repositories/         # Interfaces dos repositórios
├── infra/
│   └── repositories/         # Implementações JPA
├── security/                 # JWT Filter e configurações
├── config/                   # AppConfig (RestClient, etc)
├── dto/
│   ├── request/              # DTOs de entrada
│   └── response/             # DTOs de saída
└── shared/
    └── exceptions/           # Exceções customizadas e handler global
```

---

## 🗄️ Banco de Dados

Banco: `monitoring_db`

| Tabela | Descrição |
|---|---|
| `monitored_apis` | APIs cadastradas para monitoramento |
| `monitoring_checks` | Resultado de cada verificação |
| `health_events` | Eventos de mudança de status |

---

## 🔄 Como funciona o monitoramento

```
Usuário cadastra API
        ↓
Scheduler executa a cada 60s
        ↓
RestClient faz requisição HTTP
        ↓
Mede tempo de resposta
        ↓
Determina status:
  responseTime > 3000ms → DEGRADED
  statusCode != esperado → DOWN
  OK → UP
        ↓
Salva MonitoringCheck
        ↓
Se status mudou → salva HealthEvent
```

---

## 📊 Status das APIs

| Status | Descrição |
|---|---|
| `UP` | API respondendo normalmente |
| `DOWN` | API inacessível ou status inesperado |
| `DEGRADED` | API lenta (acima do threshold configurado) |
| `PAUSED` | Monitoramento pausado |

O threshold de latência é configurável via `application.properties`:

```properties
monitoring.degraded.threshold=3000
```

---

## 🔐 Segurança

O serviço **não possui autenticação própria** — valida o JWT gerado pelo `auth-service`. O `userId` é extraído do token e usado para isolar os dados de cada usuário.

---

## 📡 Endpoints

Todos os endpoints requerem autenticação via JWT:

```
Authorization: Bearer {token}
```

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/apis` | Cadastrar API |
| `GET` | `/apis` | Listar APIs do usuário |
| `GET` | `/apis/{id}` | Buscar API por ID |
| `PUT` | `/apis/{id}` | Atualizar API completa |
| `PATCH` | `/apis/{id}` | Atualizar API parcialmente |
| `DELETE` | `/apis/{id}` | Deletar API |
| `GET` | `/apis/{id}/history` | Histórico de checks |

---

## 📋 Exemplos de Requisição

### Cadastrar API
```json
POST /apis
{
    "name": "Minha API",
    "url": "https://minha-api.com/health",
    "method": "GET",
    "expectedStatusCode": 200,
    "checkInterval": 5,
    "timeout": 3000
}
```

### Resposta
```json
{
    "id": "a94112d5-de7f-4d25-acc6-b321285f02aa",
    "name": "Minha API",
    "url": "https://minha-api.com/health",
    "currentStatus": "PAUSED",
    "createdAt": "2026-05-27T21:33:38.501184"
}
```

### Histórico de checks
```json
GET /apis/{id}/history

[
    {
        "status": "UP",
        "statusCode": 200,
        "responseTime": 1295,
        "errorMessage": null,
        "checkedAt": "2026-05-27T22:28:16.826"
    }
]
```

---

## ⚠️ Erros

```json
{
    "error": "Not Found",
    "status": 404,
    "message": "API não encontrada",
    "path": "/apis/00000000-0000-0000-0000-000000000000",
    "timestamp": "2026-05-27T22:31:19.885"
}
```

| Status | Situação |
|---|---|
| `404` | API não encontrada |
| `409` | URL já cadastrada |
| `422` | Erros de validação |
| `500` | Erro interno |

---

## ⚙️ Como Rodar

### Com Docker (recomendado)

Na raiz do projeto `pulsewatch/`:

```bash
docker compose up --build
```

### Localmente

Pré-requisitos: Java 21+, PostgreSQL, Maven

```properties
# application.properties
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
api.security.token.secret=${JWT_SECRET}
monitoring.degraded.threshold=3000
server.port=8081
```

```bash
mvn spring-boot:run
```

---

## 🗺️ Contexto na Plataforma

```
pulsewatch/
 ├── auth-service/          ✅ concluído
 ├── monitoring-service/    ✅ concluído
 ├── incident-service/      ⬜ futuro
 ├── notification-service/  ⬜ futuro
 └── analytics-service/     ⬜ futuro
```

---

## 👨‍💻 Autor

Desenvolvido por **Thiago** como projeto de portfólio.