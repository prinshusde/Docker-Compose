
# ==========================================
# Stage 1: Build
# ==========================================
FROM node:22-alpine AS build

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install all dependencies
RUN npm ci

# Copy application source code
COPY . .

# Remove development dependencies such as nodemon
RUN npm prune --omit=dev


# ==========================================
# Stage 2: Production / Deployment
# ==========================================
FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

# Copy prepared application from build stage
COPY --from=build --chown=node:node /app/ ./

# Run as a non-root user
USER node

EXPOSE 7777

CMD ["npm", "start"]
