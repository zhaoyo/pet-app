# Build frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Build backend
FROM node:20-alpine AS backend-builder
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./
RUN npm run build

# Production image
FROM node:20-alpine
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy backend with dependencies
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm install --omit=dev
COPY --from=backend-builder /app/backend/dist ./dist

# Copy frontend build into backend's expected location
COPY --from=frontend-builder /app/frontend/dist /app/frontend/dist

# Data directory for SQLite (mount a Zeabur Volume here)
RUN mkdir -p /data

WORKDIR /app/backend

ENV NODE_ENV=production
ENV PORT=4000

EXPOSE 4000

CMD ["node", "dist/index.js"]
