ARG node_version="10.9.0"
FROM node:${node_version}-alpine AS base

FROM base as build-env
RUN apk upgrade --update \
  && apk add --no-cache yarn

FROM build-env AS dependencies
WORKDIR /app
# copy current directory to path relative to container's WORKDIR
# in this case, WORKDIR itself
COPY ./ ./
ENV NODE_ENV=development
RUN yarn install

EXPOSE 4000
CMD yarn watch
