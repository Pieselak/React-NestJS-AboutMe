# syntax=docker/dockerfile:1.7

ARG NODE_VERSION=24-bookworm-slim

FROM node:${NODE_VERSION} AS base

WORKDIR /workspace

RUN corepack enable && corepack prepare pnpm@10.0.0 --activate

FROM base AS production-dependencies

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY apps/api/package.json apps/api/package.json

RUN --mount=type=cache,id=pnpm-api,target=/root/.local/share/pnpm/store \
    pnpm install --filter api --prod --frozen-lockfile

FROM base AS build

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY apps/api/package.json apps/api/package.json

RUN --mount=type=cache,id=pnpm-api,target=/root/.local/share/pnpm/store \
    pnpm install --filter api --frozen-lockfile

COPY apps/api apps/api

RUN pnpm --filter api build

FROM node:${NODE_VERSION} AS runtime

ENV NODE_ENV=production
ENV PORT=2100

WORKDIR /workspace/apps/api

COPY --chown=node:node --from=production-dependencies /workspace/node_modules /workspace/node_modules
COPY --chown=node:node --from=production-dependencies /workspace/apps/api/node_modules ./node_modules
COPY --chown=node:node --from=build /workspace/apps/api/package.json ./package.json
COPY --chown=node:node --from=build /workspace/apps/api/dist ./dist
COPY --chown=node:node --from=build /workspace/apps/api/public ./public

USER node

EXPOSE 2100

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:2100/status').then(r => { if (!r.ok) process.exit(1) }).catch(() => process.exit(1))"

CMD ["node", "dist/main.js"]
