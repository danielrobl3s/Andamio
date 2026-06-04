# ---------- Base ----------
FROM node:22-slim AS base
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
ENV COREPACK_ENABLE_STRICT=0
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
RUN chown -R node:node /app

# ---------- Prod dependencies ----------
FROM base AS deps-prod
COPY package.json pnpm-lock.yaml .npmrc pnpm-workspace.yaml ./
COPY prisma ./prisma
RUN pnpm install --frozen-lockfile --prod

# ---------- Dev dependencies (for build) ----------
FROM base AS deps-dev
COPY package.json pnpm-lock.yaml .npmrc pnpm-workspace.yaml ./
COPY prisma ./prisma
RUN pnpm install --frozen-lockfile

# ---------- Build ----------
FROM base AS build
COPY --from=deps-dev /app/node_modules ./node_modules
COPY . .
RUN pnpm prisma generate
RUN pnpm run build

# ---------- Runtime ----------
FROM node:22-slim AS runtime
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=deps-prod /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/prisma ./prisma

EXPOSE 3000

CMD pnpm prisma migrate deploy && node dist/main.js