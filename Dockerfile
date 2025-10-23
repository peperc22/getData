FROM node:20-alpine AS base
WORKDIR /usr/src/app

COPY package.json package-lock.json* ./

# -- development stage --
FROM base AS development
RUN npm install
RUN npm install -g nodemon

COPY . .

CMD ["nodemon", "--watch", "src/**/*.ts", "--exec", "ts-node", "src/index.ts"]

# -- builds typescript code --
FROM base AS builder
RUN npm install

COPY . .

RUN npm run build

# -- production stage --
FROM base AS production
RUN npm install --omit=dev
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["npm", "run", "start"]

