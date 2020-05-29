# milo.dog
A massively over-engineered webapp about a small sausage dog, Milo.

[![Build status](https://badge.buildkite.com/9bd2a6e64f072b66cd0f0997fb75af8033fb781df412812800.svg?branch=master)](https://buildkite.com/milo-dot-dog/milo-dot-dog)

### Directory Structure

```
    .
    ├── .buildkite              # A Buildkite (https://buildkite.com/) pipeline declaration & CI instance
    │   ├── build-agent         # Terraform files for spinning up a Buildkite agent instance
    ├── api                     # A GraphQL server using graphql-yoga (https://github.com/prisma-labs/graphql-yoga)
    ├── app                     # A React Native (using React Native for Web (https://github.com/necolas/react-native-web)) app supporting iOS, Android, and Web
    ├── *.docker-compose.yml    # Handle spinning up containerised applications
    ├── ...
    └── README.md
```

### Development & Running

__Milo.dog__ is set up for local development using Docker (via a mounted volume). As you make changes to the code, they'll be reflected.

Ensure you have Docker and `yarn` installed on your machine before proceeding.

From project root: `yarn start`.

This starts all services (except those configured for dev branches in CI, following the pattern "`xTest`") in development mode.

**Visit the below to access each service:**

`/api`: [http://localhost:4000](http://localhost:4000/)

### Testing

From project root, run the below to run all tests for all services:

`yarn test`

### Running in production mode

As with development, the below runs all services except those configured specifically for running tests in CI:

From project root: `yarn serve`
