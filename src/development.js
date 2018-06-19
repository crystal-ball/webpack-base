const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const webpackServeWaitpage = require('webpack-serve-waitpage')
const chalk = require('chalk')

/** Development environment specfic configurations */
module.exports = ({ appPublic, babelLoaderInclude, serve, sassIncludePaths }) => ({
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
          `  🎉  ${chalk.green.bold('BINGO')} 🎉`,
          `  Application running at ${chalk.blue.underline(
            `http://localhost:${serve.port || 3000}`
          )}`,
        ],
        notes: [],
      },
    }),
  ],

  // webpack-serve dev server
  // ---------------------------------------------------------------------------
  /**
   * webpack-serve is a Koa server. It uses two libraries:
   *
   * - `webpack-dev-middleware` serves the files emitted by webpack.
   *   https://github.com/webpack/webpack-dev-middleware
   * - `webpack-hot-client` creates a WebSocket server and automagically adds the
   *   necessary webpack configuration, webpack plugins and client scripts.
   *   https://github.com/webpack-contrib/webpack-hot-client
   *
   * See: https://github.com/webpack-contrib/webpack-serve
   */
  serve: Object.assign(
    {
      // Tell the server where to serve content from. This is only necessary if you
      // want to serve static files.
      content: appPublic,
      // Suppresses output from dev-server, the FriendlyErrors plugin displays clean
      // error messagging
      logLevel: 'silent',
      // Opens the users default browser with application 😃
      open: true,
      // The.port.
      port: 3000,

      // Configures webpack-dev-middleware.
      dev: {
        // 😢 Add a note to docs about `publicPath` config, it's defaulted to '/' so
        // it should be fine for dev envs, but is available for speshal routing
        logLevel: 'silent',
      },

      // Configures webpack-hot-client
      hot: {},

      // The add option exposes the underlying Koa app, the webpack-dev and koa-static
      // middlewares, and the internal webpack-serve options object
      // See: https://github.com/webpack-contrib/webpack-serve#add-function-parameters
      add: (app, middleware, options) => {
        // Include waitpage invocation before everything else to ensure it has
        app.use(webpackServeWaitpage(options, { theme: 'material' }))

        // HTML5 history API fallback, rewrites request to index.html for direct
        // requests, determined by a request without a '.' in final url path section
        app.use((ctx, next) => {
          const { url } = ctx.request
          if (url.lastIndexOf('.') < url.lastIndexOf('/')) ctx.url = '/index.html'
          return next()
        })
      },
    },
    // ℹ️ Any custom configurations passed to configs will override the defaults
    serve
  ),
})
