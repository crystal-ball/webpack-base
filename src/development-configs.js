/** Development environment specfic configurations */
module.exports = ({ devServer, paths: { appPublic } }) => ({
  // Set DEVTOOL to 'eval' to see generated code, but show useful original source
  // for development workflows. Additional considerations:
  // https://github.com/facebookincubator/create-react-app/issues/343#issuecomment-237241875
  devtool: process.env.DEVTOOL || 'cheap-module-eval-source-map',

  // Development plugins
  // ---------------------------------------------------------------------------
  plugins: ['hotModuleReplacementPlugin', 'friendlyErrorsPlugin'],

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
