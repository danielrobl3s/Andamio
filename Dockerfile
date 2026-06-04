# ---------- Dependencies (prod only) ----------
FROM base AS deps-prod
COPY package.json pnpm-lock.yaml .npmrc pnpm-workspace.yaml ./
COPY prisma ./prisma
RUN pnpm install --frozen-lockfile --prod

# ---------- Dependencies (all, for build) ----------
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
FROM base AS runtime
ENV NODE_ENV=production
COPY --from=deps-prod /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/prisma ./prisma
USER node
ENV PORT=3000
EXPOSE 3000
CMD pnpm prisma migrate deploy && node dist/main.js