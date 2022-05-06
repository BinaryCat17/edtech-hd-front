// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin")

const isProduction = process.env.NODE_ENV == "production";

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),

  ],
  module: {
    rules: [
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset"
      },
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};
module.exports = () => {
  patterns = [
    { from: 'public/assets', to: 'assets' },
    { from: '_redirects', to: '' }
  ]

  if (isProduction) {
    config.mode = "production";

    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
  } else {
    config.mode = "development";
    patterns.push({ from: 'dist/service-worker*', to: '../public' })
    patterns.push({ from: 'dist/workbox*', to: '../public'})
  }

  config.plugins.push(new CopyWebpackPlugin({
    patterns
  }))

  config.watchOptions = {
    ignored: new RegExp("public|node_modules")
  }

  config.externals = ["node_modules"]

  config.devtool = 'eval-source-map',
    config.output.publicPath = "/";
  config.devServer.historyApiFallback = true;
  config.resolve = {
    alias: {
      modules: path.resolve(__dirname, 'src/modules'),
      core: path.resolve(__dirname, 'src/core'),
    }
  };
  return config;
};
