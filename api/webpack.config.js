const path = require("path");
const nodeExternals = require("webpack-node-externals");
const NodemonPlugin = require("nodemon-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "src", "index.js"),
  target: "node",
  externals: [nodeExternals()],
  output: {
    filename: "index.js",
    path: path.join(__dirname, "build")
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: { onlyCompileBundledFiles: true }
          }
        ]
      }
    ]
  },
  plugins: [new NodemonPlugin()],
  devServer: {
    contentBase: path.join(__dirname, "build"),
    port: 4000
  }
};
