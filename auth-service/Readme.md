# 🔐 Auth Service — PulseWatch

Microsserviço de autenticação e identidade da plataforma **PulseWatch** — uma plataforma SaaS de monitoramento e observabilidade de APIs.

---

## 📌 Sobre

O `auth-service` é responsável por centralizar toda a identidade da plataforma. Ele é consumido pelos outros microsserviços via JWT.

### Responsabilidades

- Cadastro de usuários
- Login
- Geração e validação de JWT
- Refresh Token
- Perfil autenticado
- Gerenciamento de roles e permissões

---

## 🛠️ Stack

| Tecnologia | Uso |
|---|---|
| Java 21 | Linguagem |
| Spring Boot 4 | Framework |
| Spring Security 7 | Segurança |
| Spring Data JPA | Persistência |
| PostgreSQL | Banco de dados |
| Flyway | Migrations |
| JWT (Auth0) | Autenticação stateless |
| Lombok | Redução de boilerplate |
| Maven | Build |

---

## 🏗️ Arquitetura

O projeto segue **Clean Architecture leve** com **DDD leve**:

```
src/main/java/com/pulsewatch/auth
│
├── api/                    # Controllers (entrada HTTP)
├── application/
│   └── usecases/           # Casos de uso (lógica de negócio)
├── domain/
│   ├── entity/             # Entidades
│   ├── enums/              # Enumerações
│   └── repositories/       # Interfaces dos repositórios
├── infra/
│   └── repositories/       # Implementações JPA
├── security/               # JWT, filtros e configurações de segurança
├── dto/
│   ├── request/            # DTOs de entrada
│   └── response/           # DTOs de saída
└── shared/
    └── exceptions/         # Exceções customizadas e handler global
```

---

## 🗄️ Banco de Dados

Banco: `auth_db`

| Tabela | Descrição |
|---|---|
| `users` | Dados dos usuários |
| `roles` | Papéis disponíveis (USER, ADMIN) |
| `user_roles` | Relacionamento N:N entre usuários e roles |
| `refresh_tokens` | Tokens de refresh ativos |

As migrations são gerenciadas pelo **Flyway** e ficam em `resources/db/migration/`.

---

## 🔑 Autenticação

O fluxo de autenticação é stateless via JWT:

```
Login → JWT (2h) + Refresh Token (7 dias)
         ↓
Requisições autenticadas → Authorization: Bearer {token}
         ↓
Token expirado → POST /auth/refresh → novo JWT
```

---

## 📡 Endpoints

### Públicos

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/auth/register` | Cadastro de usuário |
| `POST` | `/auth/login` | Login |
| `POST` | `/auth/refresh` | Renovar JWT |

### Autenticados

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/users/me` | Perfil do usuário autenticado |

---

## 📋 Exemplos de Requisição

### Cadastro
```json
POST /auth/register
{
    "name": "João Silva",
    "email": "joao@email.com",
    "password": "123456"
}
```

### Login
```json
POST /auth/login
{
    "email": "joao@email.com",
    "password": "123456"
}
```

### Resposta do Login
```json
{
    "token": "eyJhbGci...",
    "refreshToken": "eyJhbGci..."
}
```

### Refresh Token
```json
POST /auth/refresh
{
    "token": "eyJhbGci... (refreshToken)"
}
```

---

## ⚠️ Erros

Todos os erros seguem o padrão:

```json
{
    "error": "Not Found",
    "status": 404,
    "message": "Usuário não encontrado",
    "path": "/auth/login",
    "timestamp": "2026-05-24T09:08:07"
}
```

| Status | Situação |
|---|---|
| `404` | Usuário não encontrado |
| `401` | Senha inválida ou token expirado |
| `409` | Email já cadastrado |
| `422` | Erros de validação |
| `500` | Erro interno |

---

## ⚙️ Como Rodar

### Pré-requisitos

- Java 21+
- PostgreSQL
- Maven

### Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
DB_URL=jdbc:postgresql://localhost:5432/auth_db
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
JWT_SECRET=sua_chave_secreta
```

### Executar

```bash
mvn spring-boot:run
```

O servidor sobe em `http://localhost:8080`.

---

## 🗺️ Contexto na Plataforma

O `auth-service` faz parte da plataforma **PulseWatch**:

```
pulsewatch/
 ├── auth-service/          ✅ concluído
 ├── monitoring-service/    🚧 em desenvolvimento
 ├── incident-service/      ⬜ futuro
 ├── notification-service/  ⬜ futuro
 └── analytics-service/     ⬜ futuro
```

---

## 👨‍💻 Autor

Desenvolvido por **Thiago** como projeto de portfólio.
