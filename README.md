# milo.dog
A massively over-engineered webapp about a small sausage dog, Milo.

[![Build status](https://badge.buildkite.com/9bd2a6e64f072b66cd0f0997fb75af8033fb781df412812800.svg?branch=master)](https://buildkite.com/milo-dot-dog/milo-dot-dog)


### Development & Running

_milo.dog_ is set up for local development using Docker (via a mounted volume). As you make changes to the code, they'll be reflected.

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
