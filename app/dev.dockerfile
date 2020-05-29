ARG node_version="12.12.0"
FROM node:${node_version}-alpine AS base

FROM base as build-env
RUN apk upgrade --update \
  && apk add --no-cache yarn

FROM build-env AS dependencies
WORKDIR /app
COPY ./ ./
RUN yarn
