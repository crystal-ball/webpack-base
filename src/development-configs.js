'use strict'

/** Development environment specfic configurations */
module.exports = ({ devServer, devtool, paths }) => ({
  // Default to "best quality SourceMaps for development" (Set DEVTOOL to 'eval'
  // to see generated code,)
  devtool: devtool || 'eval-source-map',

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
    // ℹ️ clientLogLevel - Suppress logging, the FriendlyErrors plugin displays
    // cleaner messaging Controls the console logs in the browser before
    // reloading, HMR, etc.

    // Serve static file from the public file (only required for files not
    // imported into project)
    contentBase: paths.static,
    // Serve index.html for all unmatched routes
    historyApiFallback: true,
    // Enable hot module replacement feature
    hot: true,
    // Supress messages output, they're managed by the ProgressBarPlugin and the
    // FriendlyErrors plugin
    noInfo: true,
    // Disable auto-open until a re-use tab solution is figured out
    open: false,
    // Show compilation errors and warnings
    overlay: {
      warnings: false,
      errors: true,
    },
    // The.port.
    port: 3000,
    // Custom overrides
    ...devServer,
  },
})
