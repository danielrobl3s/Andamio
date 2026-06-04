# ---------- Base ----------
FROM node:22-slim AS base
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
# No USER node here — build stages run as root

# ---------- Dependencies ----------
FROM base AS deps
COPY package.json pnpm-lock.yaml .npmrc pnpm-workspace.yaml ./
COPY prisma ./prisma
RUN pnpm install --frozen-lockfile

# ---------- Build ----------
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm prisma generate
RUN pnpm run build
RUN pnpm prune --prod

# ---------- Runtime ----------
FROM base AS runtime
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/prisma ./prisma
# Only switch to non-root user here, for the running container
USER node
ENV PORT=3000
EXPOSE 3000
CMD pnpm prisma migrate deploy && node dist/main.js