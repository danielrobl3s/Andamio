FROM node:22-slim AS base
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
RUN chown -R node:node /app
USER node

# ---------- Dependencies ----------
# Install ALL deps (incl. dev) here so we can build. Cached unless lockfile changes.
FROM base AS deps

COPY package.json pnpm-lock.yaml .npmrc pnpm-workspace.yaml ./
COPY prisma ./prisma
RUN pnpm install --frozen-lockfile


# ---------- Build ----------
FROM base AS build

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate the Prisma client BEFORE compiling, so types are available.
RUN pnpm prisma generate

# Compile NestJS (tsc -> dist/).
RUN pnpm run build

# Strip dev dependencies for the production image.
RUN pnpm prune --prod


# ---------- Runtime ----------
FROM base AS runtime

ENV NODE_ENV=production

# Copy only what's needed to run.
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
# Prisma schema is needed at runtime for `migrate deploy`.
COPY --from=build /app/prisma ./prisma

# Run as the non-root user that the node image already provides.
USER node

# Railway injects PORT; default to 3000 locally.
ENV PORT=3000
EXPOSE 3000

# Apply pending migrations on release, then start the server.
# `migrate deploy` is the production-safe command (never prompts, never resets).
CMD pnpm prisma migrate deploy && node dist/main.js