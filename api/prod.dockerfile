# syntax=docker/dockerfile:experimental
ARG node_version="10.9.0"
FROM node:${node_version}-alpine AS base

FROM base as build-env
RUN --mount=type=cache,target=/var/cache/apk apk upgrade --update \
  && apk add --no-cache yarn

FROM build-env AS dependencies
WORKDIR /app
COPY package.json yarn.lock ./
RUN --mount=type=cache,target=/home/ubuntu/.cache/yarn/v6 \
  yarn

FROM dependencies as production-env
WORKDIR /app
COPY ./ ./

FROM production-env AS build
WORKDIR /app
RUN yarn build

FROM build-env AS production
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/package.json ./
COPY --from=build /app/build ./build

EXPOSE 4000
CMD yarn serve
