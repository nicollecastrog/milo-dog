ARG node_version="10.9.0"
FROM node:${node_version}-alpine AS base

FROM base as build-env
RUN apk upgrade --update \
  && apk add --no-cache yarn

FROM build-env AS dependencies
WORKDIR /app
COPY ./ ./
RUN yarn install
RUN yarn test

FROM dependencies AS build
WORKDIR /app
RUN yarn build

FROM build-env AS production
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
COPY --from=build /app/build ./build

EXPOSE 4000
CMD yarn serve
