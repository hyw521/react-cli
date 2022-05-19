const webpackMerge = require("webpack-merge");
const baseConfig = require("./webpack.base");
const variable = require("./utils/variable");
const path = require("path");
const { PUBLIC_PATH, SRC_PATH, DIST_PATH } = variable;
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

const config = {
  entry: {
    index: path.join(SRC_PATH, "index.tsx"),
  },
  mode: "development",
  cache: { type: "memory" },
  stats: "errors-only",
  devtool: "eval-cheap-module-source-map",
  devServer: {
    // open: "chrome",
    contentBase: PUBLIC_PATH,
    publicPath: "/",
    compress: true, //是否启用gzip压缩
    host: "localhost",
    port: 8080,
    hot: true,
    disableHostCheck: true,
    stats: "errors-only",
    proxy: {
      // "/service": {
      //     target: "http://localhost:3000"
      // }
    },
  },
};
const mergedConfig = webpackMerge.merge(baseConfig, config);
module.exports = smp.wrap(mergedConfig);
module.exports = mergedConfig;
