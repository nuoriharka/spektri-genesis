# Dockerfile
FROM node:22-bookworm-slim
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable && corepack prepare pnpm@latest --activate && pnpm i --frozen-lockfile
COPY . .
RUN pnpm build
CMD ["node","dist/index.js"]
