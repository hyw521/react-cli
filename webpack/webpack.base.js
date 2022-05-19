const path = require("path");
const variable = require("./utils/variable");
const resolveConfig = require("./utils/resolve");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const { SRC_PATH, DIST_PATH, IS_DEV } = variable;

const config = {
  entry: {
    index: path.join(SRC_PATH, "index.tsx"),
  },
  output: {
    path: DIST_PATH,
    filename: IS_DEV
      ? "js/[name].bundle.js"
      : "js/[name].[contenthash:8].bundle.js",
    publicPath: IS_DEV ? "/" : "./",
    globalObject: "this",
    chunkFilename: IS_DEV
      ? "js/[name].chunk.js"
      : "js/[name].[contenthash:8].chunk.js",
    assetModuleFilename: "assets/[hash][ext][query]",
    clean: true,
  },
  devtool: "eval-cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/i,
        exclude: /node_modules/,
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                auto: (resourcePath) => resourcePath.endsWith(".less"), // 匹配.less文件来进行css模块化。
                localIdentName: "[local]_[hash:base64:10]",
              },
            },
          },
          "postcss-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(ts|tsx)$/i,
        use: [
          {
            loader: "thread-loader", // 开启多进程打包
            options: {
              // the number of spawned workers, defaults to (number of cpus - 1) or
              // fallback to 1 when require('os').cpus() is undefined
              workers: 2,
              // number of jobs a worker processes in parallel
              // defaults to 20
              workerParallelJobs: 50,
              // additional node.js arguments
              workerNodeArgs: ["--max-old-space-size=1024"],
              // Allow to respawn a dead worker pool
              // respawning slows down the entire compilation
              // and should be set to false for development
              poolRespawn: false,
              // timeout for killing the worker processes when idle
              // defaults to 500 (ms)
              // can be set to Infinity for watching builds to keep workers alive
              poolTimeout: 2000,
              // number of jobs the poll distributes to the workers
              // defaults to 200
              // decrease of less efficient but more fair distribution
              poolParallelJobs: 50,
              // name of the pool
              // can be used to create different pools with elsewise identical options
              name: "my-pool",
            },
          },
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true, // 启用缓存
            },
          },
          {
            loader: "ts-loader",
            options: {
              happyPackMode: true,
            },
          },
        ],
      },
      // {
      //   test: /\.(jpe?g|png|gif)$/i, // 匹配图片文件
      //   use: [
      //     {
      //       loader: "file-loader", // 使用 file-loader
      //       options: {
      //         name: "[name][hash:8].[ext]",
      //       },
      //     },
      //   ],
      // },
      // {
      //   test: /\.(jpe?g|png|gif)$/i,
      //   use: [
      //     {
      //       loader: "url-loader",
      //       options: {
      //         name: "[name][hash:8].[ext]",
      //         // 文件小于 50k 会转换为 base64，大于则拷贝文件
      //         limit: 50 * 1024,
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(jpe?g|png|gif)$/i,
        type: "asset",
        generator: {
          // 输出文件位置以及文件名
          // [ext] 自带 "." 这个与 url-loader 配置不同
          filename: "[name][hash:8][ext]",
        },
        parser: {
          dataUrlCondition: {
            maxSize: 50 * 1024, //超过50kb不转 base64
          },
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        type: "asset",
        generator: {
          // 输出文件位置以及文件名
          filename: "[name][hash:8][ext]",
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 超过10kb不转 base64
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[hash:8].css",
    }),
    // new BundleAnalyzerPlugin(),
  ],
  resolve: resolveConfig,
};

module.exports = config;
