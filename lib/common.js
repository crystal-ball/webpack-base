'use strict';

const { optimize } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// ========================================================
// Webpack Development+Production Common Configurations
// ========================================================

module.exports = paths => ({
  entry: {
    app: paths.appEntry
  },

  output: {
    path: paths.appDist,
    // Entry chunks are emitted by name
    filename: paths.outputFilename,
    // The public URL of the output directory when referenced in a browser
    // (The value of the option is prefixed to every URL created by the runtime or loaders)
    // Value: Serve all resources from /assets/, eg: /assets/app.js
    publicPath: '/'
  },

  // These options change how modules are resolved.
  // https://webpack.js.org/configuration/resolve/
  resolve: {
    // Allow .jsx automatic file resolving
    extensions: ['.js', '.json', '.jsx'],
    // Tell webpack what directories should be searched when resolving modules.
    // This allows for importing modules relative to src/ directory!
    modules: [paths.nodeModules, paths.appSrc],
    // Alias can be used to point imports to specific modules
    alias: {}
  },

  module: {
    rules: [
      // JS loader runs everything through eslint then Babel
      {
        test: /\.js(x)?$/,
        // Only use loader with explicitly included files
        include: paths.babelLoaderInclude,
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
        use: [{ loader: 'babel-loader' }, { loader: 'eslint-loader' }]
      },
      // Basic image loader setup to use file-loader, configured to include hash
      // in filenames
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [{ loader: 'file-loader?name=[name].[hash:8].[ext]' }]
      }
    ]
  },

  // Define Chunks for 'vendor' and 'manifest
  // Define HTML template plugin
  plugins: [
    // Pull node_modules into vendor.js file using CommonsChunk, minChunks handles
    // checking if module is from node_modules and is a js/json file see
    // https://survivejs.com/webpack/building/bundle-splitting/
    // #loading-dependencies-to-a-vendor-bundle-automatically
    new optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({ resource }) =>
        resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/\.(js|json)$/)
    }),
    // Extract manifest into separate chunk so that changes to the app src don't
    // invalidate the vendor bundle
    // https://survivejs.com/webpack/optimizing/separating-manifest/#extracting-a-manifest
    new optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // Generates index.html with injected script/style resources paths
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml
    })
  ]
});
