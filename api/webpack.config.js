const path = require("path");
const NodemonPlugin = require("nodemon-webpack-plugin");

module.exports = {
  entry: "./index.ts",
  target: "node",
  output: {
    filename: "index.js",
    path: path.join(__dirname, "build")
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new NodemonPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, "build"),
    port: 4000
  }
}
