# milo.dog - /api

A GraphQL server using [graphql-yoga](https://github.com/prisma-labs/graphql-yoga)

### Development

Once running, this api can be accessed at [http://localhost:4000/](http://localhost:4000/)

**Using Docker:**

1. Look at the [root README](../README.md) and ensure you've completed all of the development prerequisites specified there.

1. From the root of this monorepo, run:

   `yarn start:api:dev`

   Alternatively, from within this directory (`/api`), you can run:

   `yarn start:docker`

**Using local development:**

1. Look at the [root README](../README.md) and ensure you've followed the development prerequisites specified there.

   **NOTE:** You may ignore the steps referring to _"Xcode & CocoaPods"_ and _"Android dependencies"_, these are only relevant for React Native setup of the [`/app`](../app) service.

1. From within this directory (`/api`), run: `yarn` to install the necessary node modules.

1. Then, run `yarn start`

### Testing

**To run tests against containerised app:**

From project root: `yarn run-test:api:dev`

Or, from within this directory (`/api`), run: `yarn test:docker`

**To run tests locally:**

From within this directory (`/api`):

1. `yarn` => to ensure you have the latest modules installed

1. `yarn test`
