# Andamio

Backend API for managing home-building projects: properties, clients and sales, contracts and payments, labor, expenses, vendors, material purchases and reports. Built with NestJS, Prisma and PostgreSQL, with authentication handled by Better Auth.

## Tech stack

| Layer | Tool |
| --- | --- |
| Framework | [NestJS](https://nestjs.com/) 11 (TypeScript) |
| Database | PostgreSQL via [Prisma](https://www.prisma.io/) 6 |
| Auth | [Better Auth](https://www.better-auth.com/) (email/password + Google) through `@thallesp/nestjs-better-auth` |
| Validation | `class-validator` / `class-transformer` |
| Package manager | pnpm |
| Deployment | Docker (Node 22) |

## Getting started

### Prerequisites

- Node.js 22+
- pnpm (`corepack enable`)
- A PostgreSQL database

### Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Create a .env file (see "Environment variables" below)

# 3. Generate the Prisma client and apply migrations to your local database
pnpm prisma generate
pnpm prisma migrate deploy

# 4. Run the API
pnpm start:dev
```

The API listens on **http://localhost:8080**.

### Environment variables

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string |
| `BETTER_AUTH_SECRET` | Secret used to sign sessions. Generate one with `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | Public base URL of this API (e.g. `http://localhost:8080`) |
| `GOOGLE_CLIENT_ID` | Google OAuth client id |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `NODE_ENV` | `production` enables secure and cross-subdomain cookies |

Never commit your `.env` file. It is already in `.gitignore`.

### Scripts

| Command | What it does |
| --- | --- |
| `pnpm start:dev` | Run in watch mode |
| `pnpm start` | Run once |
| `pnpm build` | Compile to `dist/` |
| `pnpm start:prod` | Run the compiled build |
| `pnpm lint` | Lint and auto-fix |
| `pnpm format` | Format with Prettier |
| `pnpm test` | Run unit tests (Jest) |

## Project structure

```
prisma/
  schema.prisma        Data model
  migrations/          SQL migrations (applied automatically on deploy)
src/
  main.ts              Bootstrap: CORS, cookies, global validation
  app.module.ts        Root module
  lib/auth.ts          Better Auth configuration
  <module>/            One folder per resource:
    <module>.controller.ts   Routes
    <module>.service.ts      Business logic and Prisma queries
    dto/                     Request validation (create / update)
    entities/                Response shapes
```

## Modules

| Module | Base route | Purpose |
| --- | --- | --- |
| Projects | `/projects` | Construction projects (`GET /projects/me` for the current user's) |
| Projects properties | `/projects-properties` | Lots / properties inside a project |
| Clients | `/clients` | Buyers |
| Sales | `/sales` | Sales of properties to clients |
| Contracts | `/contracts` | Contracts with clients and their payment status |
| Client logs | `/client-logs` | Payments made against a contract (`?contract_id=` to filter) |
| Labor | `/labor` | Registered workers |
| Expenses | `/expenses` | Labor payments and indirect expenses (`?project_id=`, `?kind=labor\|indirect`) |
| Vendors | `/vendors` | Material suppliers |
| Catalogues | `/catalogues` | A vendor's catalogues |
| Catalogue materials | `/catalogue-materials` | Priced items inside a catalogue |
| Materials | `/materials` | Material purchases |
| Reports | `/reports` | Saved queries (`GET /reports/executeQuery/:id` runs one) |

Better Auth serves its own sign-in / sign-up / session endpoints under `/api/auth/*`.

### Route conventions

Most resources follow the same shape:

```
GET    /<resource>            list (some use /all)
GET    /<resource>/:id        get one
POST   /<resource>/create     create
PATCH  /<resource>/update/:id update
DELETE /<resource>/delete/:id delete
```

Exceptions: `/materials` uses `GET /materials/all`, `PATCH /materials/:id` and `DELETE /materials/:id`. `/vendors`, `/catalogues` and `/catalogue-materials` use `/all` for the list and `/vendor/:id`, `/catalogue/:id` and `/catalogue-material/:id` for get-one.

## Authentication and data ownership

- Every route requires a valid session cookie (`AuthGuard`), except the health route `GET /`.
- Every record stores `created_by`, and queries are scoped to the logged-in user. One account never sees another account's data.
- `created_by` is set from the session on the server. Do **not** send it in request bodies: the API rejects unknown fields.

## Validation

A global `ValidationPipe` runs with `whitelist`, `forbidNonWhitelisted` and `transform` enabled. Requests with unknown properties return `400`, and dates are accepted as `yyyy-MM-dd`.

## Database and migrations

Schema changes live in `prisma/schema.prisma`. To create a migration during development:

```bash
pnpm prisma migrate dev --name <describe_the_change>
```

In production, **do not run migrations by hand**. The Docker image runs `prisma migrate deploy` on every start, so committing the migration folder and deploying is enough.

## Deployment

```bash
docker build -t home-builder-api .
docker run --env-file .env -p 8080:8080 home-builder-api
```

The container applies pending migrations and then starts `node dist/main`. Set the environment variables listed above on your host (for example, Railway).

## License

Private project. All rights reserved.
