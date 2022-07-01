FROM node:lts-alpine as builder

WORKDIR /usr/src/app
COPY package*.json ./
COPY config/ ./config

RUN npm ci
COPY src/ ./src
RUN npm run build

FROM node:lts-alpine

EXPOSE 3000
ENV NODE_ENV production
USER node
WORKDIR /usr/src/app

COPY package*.json ./
COPY config/ ./config
RUN npm ci
COPY --from=builder /usr/src/app/dist/ ./dist

ENTRYPOINT ["npm", "run", "start:prod"]