const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const IS_WEBPACK_PROD =  process.env.IS_WEBPACK_PROD;
const IS_PRODUCTION = process.argv.indexOf('--mode=productin') > -1 || IS_WEBPACK_PROD === "true";
const MODE = IS_PRODUCTION ? "production" : "development";
const DEVTOOL = IS_PRODUCTION ? false : "inline-cheap-source-map";
const MINIMIZE = IS_PRODUCTION ? true : false;
const PUBLIC_PATH = (process.argv.indexOf('--mode=production') > -1) ? 
    "/static/jupyter_viewer/"
  : 
    (IS_WEBPACK_PROD === "true") ? "/" : "http://localhost:3063/";

module.exports = {
  entry: "./src/ViewerApp",
  mode: MODE,
  devServer: {
    port: 3063,
    client: { overlay: false },
    historyApiFallback: {
      disableDotRule: true,
    },
    hot: !IS_PRODUCTION,
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 2000, // Seems to stabilise HMR file change detection
    ignored: "/node_modules/"
  },
  devtool: DEVTOOL,
  optimization: {
    minimize: MINIMIZE,
//    usedExports: true,
  },
  output: {
    publicPath: PUBLIC_PATH,
//    filename: '[name].[contenthash].jupyter-viewer.js',
    filename: '[name].jupyter-viewer.js',
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      path: "path-browserify",
      stream: "stream-browserify",
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        options: {
          plugins: [
            "@babel/plugin-proposal-class-properties",
          ],
          presets: [
            ["@babel/preset-react", {
                runtime: 'automatic',
              },
            ],
            "@babel/preset-typescript",
          ],
          cacheDirectory: true
        },
        exclude: /node_modules/,
      },
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"],
          cacheDirectory: true
        }
      },
      {
        test: /\.css?$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        // In .css files, svg is loaded as a data URI.
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        issuer: /\.css$/,
        use: {
          loader: 'svg-url-loader',
          options: { encoding: 'none', limit: 10000 }
        }
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        issuer: /\.tsx$/,
        use: [
          '@svgr/webpack'
        ],
      },
      {
        // In .ts and .tsx files (both of which compile to .js), svg files
        // must be loaded as a raw string instead of data URIs.
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        issuer: /\.js$/,
        use: {
          loader: 'raw-loader'
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif|ttf|woff|woff2|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{ loader: 'url-loader', options: { limit: 10000 } }],
      },
      // Ship the JupyterLite service worker.
      {
        resourceQuery: /text/,
        type: 'asset/resource',
        generator: {
          filename: '[name][ext]',
        },
      },
      // Rule for pyodide kernel
      {
        test: /pypi\/.*/,
        type: 'asset/resource',
        generator: {
          filename: 'pypi/[name][ext][query]',
        },
      },
      {
        test: /pyodide-kernel-extension\/schema\/.*/,
        type: 'asset/resource',
        generator: {
          filename: 'schema/[name][ext][query]',
        },
      }
    ]
  },
  plugins: [
    !IS_PRODUCTION ?
      new webpack.ProvidePlugin({
        process: 'process/browser'
      })
    :
      new webpack.ProvidePlugin({
        process: 'process/browser'
      }),
      new BundleAnalyzerPlugin({
          analyzerMode: IS_PRODUCTION ? "static" : "disabled", // server, static, json, disabled.
          openAnalyzer: false,
          generateStatsFile: false,
        }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
