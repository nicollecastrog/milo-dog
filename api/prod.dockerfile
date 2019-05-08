ARG node_version="10.9.0"
FROM node:${node_version}-alpine AS base

FROM base as build-env
RUN apk upgrade --update \
  && apk add --no-cache yarn

FROM build-env AS dependencies
WORKDIR /app
COPY ./ ./
RUN yarn install

FROM dependencies AS production
WORKDIR /app
RUN yarn build

EXPOSE 4000
CMD yarn serve
