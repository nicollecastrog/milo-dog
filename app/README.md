# milo.dog - /app

A React Native (using [React Native for Web](https://github.com/necolas/react-native-web)) app supporting iOS, Android, and Web.

### Development

Once running, this application can be accessed via the Xcode device simulator and Android Studio device emulator.

**Using Docker:**

1. Look at the [root README](../README.md) and ensure you've completed all of the development prerequisites specified there.

1. From the root of this monorepo, run:

     `yarn start:app:dev`

     Alternatively, from within this directory (`/app`), you can run:

     `yarn start:docker`

*To start the iOS frontend:*

1. From the root of this monorepo, run:

     `yarn run:ios`

     Alternatively, from within this directory (`/app`), you can run:

     `yarn ios`

*To start the Android frontend:*

1. Open Android Studio and your chosen device within Android Studio by going to `Tools > AVD Manager` and pressing the "play"/launch button on your previously-setup device.

1. From the root of this monorepo, run:

     `yarn run:android`

     Alternatively, from within this directory (`/app`), you can run:

     `yarn android`

**Using local development:**

1. Look at the [root README](../README.md) and ensure you've completed all of the development prerequisites specified there.

1. Additionally, you'll need to install Node and Watchman as per the [React Native docs](https://reactnative.dev/docs/environment-setup).

1. From within this directory (`/app`), run: `yarn` to install the necessary node modules.

1. Then, run `yarn start`

1. Follow the iOS and/or Android frontend instructions above, as needed.

### Testing

**To run tests against containerised app:**

From project root: `yarn run-test:app:dev`

Or, from within this directory (`/app`), run: `yarn test:docker`

**To run tests locally:**

From within this directory (`/app`):

1. `yarn` => to ensure you have the latest modules installed

1. `yarn test`
