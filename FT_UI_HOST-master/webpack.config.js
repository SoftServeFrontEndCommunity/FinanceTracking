const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const configs = {
  appName: "container",
  appFileName: "remoteEntry.js",
  development: {
    PUBLIC_PATH: "http://localhost:3000/",
    AUTH_PATH: "auth@http://localhost:3001/remoteEntry.js",
    DASHBOARD_PATH: "dashboard@http://localhost:3002/remoteEntry.js",
    TRANSACTIONS_PATH: "transactions@http://localhost:3003/remoteEntry.js",
    PORT: 3000,
  },
  production: {
    PUBLIC_PATH: "http://localhost:3000/",
    AUTH_PATH: "auth@http://localhost:3001/remoteEntry.js",
    DASHBOARD_PATH: "dashboard@http://localhost:3002/remoteEntry.js",
    TRANSACTIONS_PATH: "transactions@http://localhost:3003/remoteEntry.js",
    PORT: 3000,
  },
};

const deps = require("./package.json").dependencies;

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
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[path][name].[ext]",
              },
            },
          ],
        },
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
          auth: configs[argv.mode].AUTH_PATH,
          dashboard: configs[argv.mode].DASHBOARD_PATH,
          transactions: configs[argv.mode].TRANSACTIONS_PATH,
        },
        exposes: {
          "./hooks/useStore": "./src/hooks/useStore.ts",
          "./hooks/useStoreSelector": "./src/hooks/useStoreSelector.ts",
          "./providers/StoreProvider": "./src/providers/StoreProvider.tsx",
          "./hooks/useFetch": "./src/hooks/useFetch.ts",
          "./shared/constants": "./src/shared/constants.ts",
        },
        shared: {
          ...deps,
          redux: { singleton: true },
          "react-redux": { singleton: true },
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
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
