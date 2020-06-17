const path = require("path");
const webpack = require("webpack"); // eslint-disable-line no-unused-vars
const HtmlWebpackPlugin = require("html-webpack-plugin");

const appDirectory = path.resolve(__dirname, "../");
const isDev = () => process.env.NODE_ENV !== "production";

// This is needed for webpack to compile JavaScript.
// Many OSS React Native packages are not compiled to ES5 before being
// published. If you depend on uncompiled packages they may cause webpack build
// errors. To fix this webpack can be configured to compile to the necessary
// `node_module`.
const babelLoaderConfiguration = {
  test: /\.(js|ts)x?$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(appDirectory, "index.web.js"),
    path.resolve(appDirectory, "src"),
    path.resolve(appDirectory, "node_modules/react-native-uncompiled")
  ],
  use: {
    loader: "babel-loader",
    options: {
      cacheDirectory: true,
      babelrc: false,
      // The 'module:metro-react-native-babel-preset' preset is used to match React Native's packager
      presets: ["module:metro-react-native-babel-preset"],
      // Re-write paths to import only the modules needed by the app
      plugins: ["react-native-web"]
    }
  }
};

// This is needed for webpack to import static images in JavaScript files.
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png)$/,
  exclude: /node_modules/,
  use: {
    loader: "react-native-web-image-loader",
    options: {
      name: "[path][name].[hash].[ext]",
      outputPath: "images/",
      scalings: { "@1.5x": 1.5, "@2x": 2, "@3x": 3 },
      esModule: false
    }
  }
};

const htmlPlugin = new HtmlWebpackPlugin({
  template: path.resolve(appDirectory, "web", "index.html")
});

module.exports = {
  entry: [
    // load any web API polyfills
    // path.resolve(appDirectory, 'polyfills-web.js'),

    // your web-specific entry file
    path.resolve(appDirectory, "index.web.js")
  ],

  // configures where the build ends up
  output: {
    path: path.resolve(appDirectory, "web", "dist"),
    filename: isDev() ? "[name].js" : "[name].[hash].js"
  },

  devtool: "source-map",

  module: {
    rules: [babelLoaderConfiguration, imageLoaderConfiguration]
  },

  plugins: [htmlPlugin],

  resolve: {
    // This will only alias the exact import "react-native"
    alias: {
      "react-native$": "react-native-web"
    },
    // If you're working on a multi-platform React Native app, web-specific
    // module implementations should be written in files using the extension
    // `.web.js`.
    extensions: [".web.ts", ".web.tsx", ".web.js", ".ts", ".tsx", ".js"]
  },

  devServer: {
    port: 3000
  }
};
