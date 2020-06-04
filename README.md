# milo.dog
A massively over-engineered webapp about a small sausage dog, Milo :dog:

[![Build status](https://badge.buildkite.com/9bd2a6e64f072b66cd0f0997fb75af8033fb781df412812800.svg?branch=master)](https://buildkite.com/milo-dot-dog/milo-dot-dog)

## Directory Structure

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

## Development & Running

__Milo.dog__ is a monorepo containing several containerised applications. It is set up for local development using Docker (via mounted volumes). As you make changes to the code, they'll be reflected.

#### Prerequisites:

  1. You must have [Docker](https://docs.docker.com/get-docker/) installed (minimum version: 18.06). You must also set `{ "experimental": true }` in the [Docker Daemon configuration file](https://docs.docker.com/engine/reference/commandline/dockerd/#daemon-configuration-file).
  
     Both the minimum version and the `experimental` config mentioned above are needed because this project uses the [Buildkit](https://docs.docker.com/engine/reference/builder/#buildkit) engine to do Docker builds. Buildkit provides lots of benefits such as skipping unused build stages and parallelising independent build stages. Additionally, it allows for use of [experimental Dockerfile syntaxes](https://github.com/moby/buildkit/blob/master/frontend/dockerfile/docs/experimental.md), which in turn allows us to use cache mounts to further optimise builds. For example, whereas adding a new package will invalidate the Docker layer cache upon `yarn install`, using a cache mount will ensure that all the previously-downloaded packages are reused and only the new package is installed.

1. If your chosen method of installation of Docker doesn't already include Docker Compose, please [make sure you install that too](https://docs.docker.com/compose/install/).

1. You must have [`yarn`](https://classic.yarnpkg.com/en/docs/install) installed.

1. Install **Xcode & CocoaPods**: follow the instructions on the [React Native environment setup page](https://reactnative.dev/docs/environment-setup).

     Make sure to select "Target OS: iOS" and the **React Native CLI Quickstart** and *not* the Expo one. Then scroll down to the "Xcode & CocoaPods" section, and follow the steps there.

     You may skip the "Node & Watchman" section as both of these are run within a Docker container in our setup, which avoids having to run them locally during development.

1. Install **Android dependencies**: again, follow the instructions on the [React Native docs](https://reactnative.dev/docs/environment-setup) **React Native CLI Quickstart**, but for Android this time.

     As part of these steps, you'll be asked to download [Android Studio](https://developer.android.com/studio/index.html). Be sure to also [create a virtual device](https://developer.android.com/studio/run/managing-avds#createavd) within Android Studio.

     You can skip any steps for installing Node and Watchman.

#### To start all services for development:

This project uses two root-level Docker Compose files to manage startup of all the applications contained within this repo.

There is a "Test" version of each service declared in the Docker Compose files, following the pattern "`xTest`". Those test services are optimised for use in CI branch builds (for example, the test version of a service will leave out steps that are specific to running a development server).

The below commands do *not* start the "Test"/CI-specific services:

1. From project root: `yarn start`. Now all the development servers for all services are containerised and running.

1. Open Android Studio and your chosen device within Android Studio by going to `Tools > AVD Manager` and pressing the "play"/launch button on your previously-setup device.

1. To run iOS and Android frontends: `yarn run:app`

#### Visit the below to access each service:

`/api`: [http://localhost:4000](http://localhost:4000/)

`/app`:
  * *Development server* (Metro bundler): http://localhost:8081/
  * *iOS frontend*: Xcode simulator on your local machine (launched by `yarn run:app` in steps above)
  * *Android frontend*: Android Studio emulator on your local machine (manually opened and then connected to the dev server by `yarn run:app` step above)
  * *Web frontend*: TBD

#### Application server logs:

As with any Dockerised application, you may use the Docker CLI to access any logs:

1. `docker ps -a` to see all running containers. Copy the container ID of the application whose logs you'd like to view.

1. `docker logs <containerID> -f` will show you the latest logs. You can use `^C` (control + c) to exit the shell.

#### Alternative way to run the services:

You may of course choose to run each service individually, locally, rather than as a containerised application.

In that case you need to have all the *Prerequisites* mentioned above as well as Node and Watchman installed as per the [React Native docs](https://reactnative.dev/docs/environment-setup).

Check the `README` of each application for steps to run it locally.

## Testing

#### To run tests against containerised applications:

`/api`:

From project root: `yarn run-test:api:dev`

`/app`:

From project root: `yarn run-test:app:dev`

#### To run tests against applications set up locally:

1. Ensure you've followed the installation instructions in each application's `README`.

1. `yarn test`

## Running in production mode

As with development, the below runs all services except those configured specifically for running tests in CI:

From project root: `yarn serve`
