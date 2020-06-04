module.exports = {
  root: true,
  extends: [
    // supports es6 + typescript + jest spec files & uses prettier
    // uses eslint-config-prettier internally to turns off all rules that
    // are unnecessary or might conflict with Prettier
    "@react-native-community",
  ],
  rules: {
    "comma-dangle": 0,
    quotes: 0,
    semi: 0
    // fixes bug in @react-native-community where certain eslint rules that conflict with Prettier are forced: https://github.com/facebook/react-native/blame/master/packages/eslint-config-react-native-community/index.js#L261
    // a fix was submitted but was reverted by FB due to conflicts with their own setup (https://github.com/facebook/react-native/pull/26847)
  },
};
