ARG VARIANT=12
FROM node:${VARIANT}-buster-slim

USER NODE

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --quiet

COPY . .