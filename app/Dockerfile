# Build stage
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Build arguments
ARG VITE_APP_URL
ARG VITE_PB_URL
ENV VITE_APP_URL=$VITE_APP_URL
ENV VITE_PB_URL=$VITE_PB_URL

RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]