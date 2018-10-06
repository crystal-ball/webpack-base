/** Development environment specfic configurations */
module.exports = ({ appPublic, devServer }) => ({
  // This makes the bundle appear split into separate modules in the devtools.
  // We use this instead of source maps in order to have visibility into actual code
  // being executed, `cheap-module-source-map` can be set if needed
  // https://github.com/facebookincubator/create-react-app/issues/343#issuecomment-237241875
  devtool: 'eval',

  // Development plugins
  // ---------------------------------------------------------------------------
  plugins: ['hotModuleReplacement', 'friendlyErrors'],

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
