# syntax=docker/dockerfile:1.7

ARG NODE_VERSION=24-bookworm-slim
ARG NGINX_VERSION=1.29-alpine

FROM node:${NODE_VERSION} AS build

WORKDIR /workspace

RUN corepack enable && corepack prepare pnpm@10.0.0 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY apps/web/package.json apps/web/package.json

RUN --mount=type=cache,id=pnpm-web,target=/root/.local/share/pnpm/store \
    pnpm install --filter web --frozen-lockfile

COPY apps/web apps/web

ARG VITE_API_URL
ARG VITE_CONTACT_EMAIL

ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_CONTACT_EMAIL=${VITE_CONTACT_EMAIL}

RUN test -n "$VITE_API_URL" \
    && pnpm --filter web build

FROM nginxinc/nginx-unprivileged:${NGINX_VERSION} AS runtime

COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf
COPY --chown=nginx:nginx --from=build /workspace/apps/web/dist /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:8080/health || exit 1

