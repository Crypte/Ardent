# Build stage
FROM node:20-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Build arguments
ARG VITE_API_URL
ARG VITE_PB_URL
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_PB_URL=$VITE_PB_URL

RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]