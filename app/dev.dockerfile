# syntax=docker/dockerfile:experimental
ARG node_version="12.12.0"
FROM node:${node_version}-alpine AS base

FROM base as test-build-env
RUN --mount=type=cache,target=/var/cache/apk apk add --no-cache \
  yarn

FROM test-build-env AS test-dependencies
WORKDIR /app
COPY ./ ./
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn/v1 \
  yarn

FROM base as watchman-runtime-dependencies
RUN --mount=type=cache,target=/var/cache/apk apk add --no-cache \
  libcrypto1.1 \
  libgcc \
  libstdc++

FROM watchman-runtime-dependencies as watchman-builder
RUN --mount=type=cache,target=/var/cache/apk apk add --no-cache --update \
  ca-certificates \
  openssl

FROM watchman-builder as watchman-build-env
RUN --mount=type=cache,target=/var/cache/apk apk add --no-cache \
  automake \
  autoconf \
  bash \
  build-base \
  libtool \
  linux-headers \
  openssl-dev \
  python-dev

FROM watchman-build-env as build-env
RUN --mount=type=cache,target=/var/cache/apk apk add --no-cache \
  yarn \
  git
RUN git clone https://github.com/facebook/watchman.git -b v4.9.0 --depth 1
RUN cd watchman && ./autogen.sh && ./configure --without-python --without-pcre --enable-lenient && make && make install
RUN rm -rf watchman

FROM build-env AS dependencies
WORKDIR /app
COPY ./ ./
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn/v1 \
  yarn

EXPOSE 8081
CMD yarn start
