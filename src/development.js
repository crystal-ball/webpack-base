const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const chalk = require('chalk')
const { HotModuleReplacementPlugin } = require('webpack')

/** Development environment specfic configurations */
module.exports = ({
  appPublic,
  babelLoaderInclude,
  devServer,
  sassIncludePaths,
}) => ({
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
    // --- ℹ️ Indicators
    // Shows and clears errors in a easier to read format
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [
          `  🎉  ${chalk.bold.green('BINGO')} 🎉`,
          `  Application running at ${chalk.underline.blue(
            `http://localhost:${devServer.port || 3000}`
          )}`,
        ],
        notes: [],
      },
    }),

    // --- 🔥 Modules
    // HMR - see guides/architecture/build
    new HotModuleReplacementPlugin(),
  ],

  // Dev Server
  // ---------------------------------------------------------------------------
  devServer: Object.assign(
    {
      // Tell the server where to serve content from. This is only necessary if you
      // want to serve static files.
      contentBase: appPublic,
      // enable gzip compression
      compress: true,
      // Enable history API fallback so HTML5 History API based
      // routing works. This is a good default that will come
      // in handy in more complicated setups.
      // true for index.html upon 404, object for multiple paths
      historyApiFallback: true,
      // The. port.
      port: 3000,
      // See guides/architecture/build - HMR
      hot: true,
      // true for self-signed, object for cert authority
      https: false,
      // only errors & warns on hot reload
      noInfo: true,
      // overlay: true captures only errors
      overlay: {
        errors: true,
        warnings: false,
      },
      // Suppresses output from dev-server, the FriendlyErrors plugin displays clean
      // error messagging
      quiet: true,
    },
    // ℹ️ Any custom configurations passed to configs will override the defaults
    devServer
  ),
})
