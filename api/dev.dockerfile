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

FROM dependencies AS dev-env
WORKDIR /app
# copy the source code to WORKDIR
# however in development, the volume declared in root dev.docker-compose
# overrides what's copied in here, ensuring that code dynamically updates
# without needing to rebuild the dev docker image
COPY ./ ./

EXPOSE 4000
CMD yarn watch
