'use strict'

/** Development environment specfic configurations */
module.exports = ({ devServer, devtool, paths }) => ({
  // Default to "best quality SourceMaps for development" (Set DEVTOOL to 'eval'
  // to see generated code,)
  devtool: devtool || 'eval-source-map',

  stats: {
    logging: 'warn',
  },

  // webpack-dev-server
  // ---------------------------------------------------------------------------

  /**
   * WDS docs: https://github.com/webpack/webpack-dev-server
   * File serving debug info served at /webpack-dev-server
   */
  devServer: {
    client: {
      // Show compilation errors and warnings
      overlay: {
        warnings: false,
        errors: true,
      },
    },
    // Serve index.html for all unmatched routes
    historyApiFallback: true,
    // Enable hot module replacement feature
    hot: true,
    // Disable auto-open until a re-use tab solution is figured out
    open: false,
    // The.port.
    port: 3000,
    // Serve static file from the public file (only required for files not
    // imported into project)
    static: paths.static,
    // Custom overrides
    ...devServer,
  },
})
