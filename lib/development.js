'use strict';
const webpack = require('webpack');
let paths = require('./paths');

// ========================================================
// Webpack Development Only Configurations
// See guides/architecture/build - Webpack
// ========================================================

/* NOTE:
 * - Includes HMR Assets
 * - Configures webpack dev server
 */

module.exports = customPaths => {
  // Override paths with any custom paths
  paths = Object.assign(paths, customPaths);

  return {
    // This makes the bundle appear split into separate modules in the devtools.
    // We don't use source maps here because they can be confusing:
    // https://github.com/facebookincubator/create-react-app/issues/343#issuecomment-237241875
    // You may want 'cheap-module-source-map' instead if you prefer source maps.
    devtool: 'eval',

    entry: {
      app: [
        // 'babel-polyfill', // Emulate a full ES2015 environment
        'react-hot-loader/patch', // See guides/architecture/build - HMR
        paths.appIndexJs
      ]
    },

    module: {
      rules: [
        {
          test: /\.scss/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            {
              loader: 'sass-loader',
              options: {
                // Needed to use @import for Bootstrap + Componentry
                // src/styles allows easy theme variable import
                includePaths: [
                  'src/styles',
                  'node_modules/componentry/styles',
                  'node_modules/bootstrap/scss'
                ]
              }
            }
          ]
        }
      ]
    },

    plugins: [
      new webpack.DefinePlugin(JSON.stringify('development')),
      // See guides/architecture/buid - HMR
      new webpack.HotModuleReplacementPlugin(),
      // prints more readable module names in the browser console on HMR updates
      new webpack.NamedModulesPlugin(),
      // do not emit compiled assets that include errors
      new webpack.NoEmitOnErrorsPlugin()
    ],

    devServer: {
      // Tell the server where to serve content from. This is only necessary if you
      // want to serve static files.
      contentBase: paths.appPublic,
      // enable gzip compression
      compress: true,
      // Enable history API fallback so HTML5 History API based
      // routing works. This is a good default that will come
      // in handy in more complicated setups.
      // true for index.html upon 404, object for multiple paths
      historyApiFallback: true,
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
        warnings: true
      }
    }
  }
};
