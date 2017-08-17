'use strict';

const webpack = require('webpack');

/**
 * Development environment specfic configurations
 * @param {Object} paths Configured paths for environment build
 * @return {Object} Development specific configurations to merge with cross
 *                  environment configurations
 */
module.exports = ({ appPublic }) => ({
  // This makes the bundle appear split into separate modules in the devtools.
  // We don't use source maps here because they can be confusing:
  // https://github.com/facebookincubator/create-react-app/issues/343#issuecomment-237241875
  // You may want 'cheap-module-source-map' instead if you prefer source maps.
  devtool: 'eval',

  // CSS Loader Definition - Dev
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              localIdentName: '[name][local]--[hash:base64:5]'
            }
          },
          {
            loader: 'sass-loader',
            options: {
              // src/styles allows easy theme variable import
              includePaths: ['src/styles']
            }
          }
        ]
      }
    ]
  },

  plugins: [
    // Replace process.env.NODE_ENV with 'development'
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"' }),
    // See guides/architecture/build - HMR
    new webpack.HotModuleReplacementPlugin(),
    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),
    // do not emit compiled assets that include errors
    new webpack.NoEmitOnErrorsPlugin()
  ],

  devServer: {
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
      warnings: false
    }
  }
});
