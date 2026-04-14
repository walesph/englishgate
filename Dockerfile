FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --ignore-scripts

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD npx prisma db push && node node_modules/next/dist/bin/next start
