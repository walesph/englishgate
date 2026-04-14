FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD echo "Starting Next.js on port ${PORT:-3000}..." && node node_modules/next/dist/bin/next start -p ${PORT:-3000} -H 0.0.0.0
