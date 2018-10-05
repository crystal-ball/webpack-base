const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const webpack = require('webpack')
const chalk = require('chalk')

/** Development environment specfic configurations */
module.exports = ({ appPublic, babelLoaderInclude, devServer, sassIncludePaths }) => ({
  // This makes the bundle appear split into separate modules in the devtools.
  // We use this instead of source maps in order to have visibility into actual code
  // being executed, `cheap-module-source-map` can be set if needed
  // https://github.com/facebookincubator/create-react-app/issues/343#issuecomment-237241875
  devtool: 'eval',

  // Development loaders
  // ---------------------------------------------------------------------------
  module: {
    rules: [
      // --- 🎉 JS Loader
      // Dev JS loader runs source through ESLint then Babel
      {
        test: /\.jsx?$/,
        // Only use loader with explicitly included files
        include: babelLoaderInclude,
        /**
         * ## Using Eslint Loader
         * The `eslint-loader` will run imported modules through eslint first and
         * surface errors/warnings in the webpack build (These are also picked up by
         * the webpack-dev-server).
         *
         * **DEPENDENCIES**: This package only includes the eslint-loader package,
         * `eslint` and any packages required to run the eslint rules for a project
         * must be included by that project. This allows projects to handle
         * specifying and configuring eslint explicitly as required.
         */
        use: [{ loader: 'babel-loader' }, { loader: 'eslint-loader' }],
      },

      // --- 😍 Styles Loader
      // ℹ️ Dev styles uses SASS+CSS loader chain and injects results into DOM
      {
        test: /\.scss$/,
        use: [
          // In dev the style loader injects imported styles into the DOM, this is
          // replaced with the MiniCSSExtract in production
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              localIdentName: '[name]-[local]--[hash:5]',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              // Allows for aliased imports from include paths, especially useful
              // for importing app theme variables and mixins into component styles
              includePaths: sassIncludePaths,
            },
          },
        ],
      },
    ],
  },

  // Development plugins
  // ---------------------------------------------------------------------------
  plugins: [
    // --- 🔥 Hot Module Replacement
    // See: https://webpack.js.org/concepts/hot-module-replacement/
    new webpack.HotModuleReplacementPlugin(),

    // --- ℹ️ Indicators
    // Shows and clears errors in a easier to read format
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [
          `  🎉  ${chalk.green.bold('BINGO')} 🎉`,
          `  Application running at ${chalk.blue.underline(
            `http://${devServer.host || 'localhost'}:${devServer.port || 3000}`
          )}`,
        ],
        notes: [],
      },
    }),
  ],

  // webpack-dev-server
  // ---------------------------------------------------------------------------

  /**
   * WDS docs: https://github.com/webpack/webpack-dev-server
   * File serving debug info served at /webpack-dev-server
   */
  devServer: {
    // Only log initial startup information
    quiet: true,
    // ℹ️ clientLogLevel - Suppress logging, the FriendlyErrors plugin displays
    // cleaner messaging Controls the console logs in the browser before
    // reloading, HMR, etc.

    // Serve static file from the public file (only required for files not
    // imported into project)
    contentBase: appPublic,
    // Serve index.html for all unmatched routes
    historyApiFallback: true,
    // Enable hot module replacement feature
    hot: true,
    // Disable auto-open until a re-use tab solution is figured out
    open: false,
    // Show compilation errors and warnings
    overlay: {
      warnings: false,
      errors: true,
    },
    // The.port.
    port: 3000,
    //   // Custom overrides
    ...devServer,
  },
})
