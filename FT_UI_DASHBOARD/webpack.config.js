const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;

const configs = {
  appName: "dashboard",
  appFileName: "remoteEntry.js",
  development: {
    PUBLIC_PATH: "http://localhost:3002/",
    CONTAINER_PATH: "container@http://localhost:3000/remoteEntry.js",
    PORT: 3002,
  },
  production: {
    PUBLIC_PATH: "http://localhost:3002/",
    CONTAINER_PATH: "container@http://localhost:3000/remoteEntry.js",
    PORT: 3002,
  },
};

module.exports = (env, argv) => {
  return {
    output: {
      publicPath: configs[argv.mode].PUBLIC_PATH,
    },

    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },
    devtool: "source-map",
    devServer: {
      hot: true,
      port: configs[argv.mode].PORT,
      historyApiFallback: true,
      allowedHosts: "all",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
    },

    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },

    plugins: [
      new ModuleFederationPlugin({
        name: configs.appName,
        filename: configs.appFileName,
        remotes: {
          container: configs[argv.mode].CONTAINER_PATH,
        },
        exposes: {
          "./DashboardRoutes": "./src/routing/routes.tsx",
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          redux: { singleton: true },
          "react-redux": { singleton: true },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
          "react-router-dom": { singleton: true, strictVersion: true },
        },
      }),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
      }),
    ],
  };
};
