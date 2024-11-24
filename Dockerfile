# Builder stage
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./

RUN npm install


# Development stage
FROM node:20-alpine AS development

WORKDIR /app

COPY --from=deps /app /app
COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]


# Builder stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY --from=deps /app /app
COPY . .

RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY package*.json ./

RUN npm ci --only=production

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next

# Changing running user
USER nextjs

ENV NODE_ENV=production

EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]