FROM node:lts-alpine as builder

WORKDIR /usr/src/app
COPY package*.json ./
COPY config ./

RUN npm ci
COPY src /usr/src/app
RUN npm run build


FROM node:lts-alpine

ENV NODE_ENV production
WORKDIR /usr/src/app
USER node

COPY package*.json ./
COPY config ./
COPY --from=builder /usr/src/app/dist ./

CMD ["npm" "start:prod"]