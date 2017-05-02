'use strict';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
let paths = require('./paths');

// ========================================================
// Webpack Production Configurations
// See guides/architecture/build - Webpack
// ========================================================

/* NOTE:
 * - Seems webpack2 automatically defines process.env.NODE_ENV and runs uglify
 * - Prod assets are emitted with hashes for cache busting
 * - ExtractTextPlugin pulls SASS into external css file
 */

const extractStylesPlugin = new ExtractTextPlugin({
  // Include content hash so that only CSS changes (and not changes to JS will
  // invalidate css bundle)
  filename: '[name].[contenthash].css'
});

module.exports = customPaths => {
  // Override paths with any custom paths
  paths = Object.assign(paths, customPaths);

  return {
    // Read source maps for production builds
    devtool: 'source-map',

    entry: {
      app: [
        // Full ES2015 polyfill
        // 'babel-polyfill',
        paths.appIndexJs
      ]
    },

    output: {
      // Prod - include chunkhash for cache busting
      filename: '[name].[chunkhash].js'
    },

    module: {
      rules: [
        {
          test: /\.scss/,
          use: extractStylesPlugin.extract({
            fallback: 'style-loader',
            use: [
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
          })
        }
      ]
    },

    plugins: [
      // Clean /dist folder
      new CleanWebpackPlugin([paths.appDist], {
        // root is required b/c our paths are absolute and clean makes sure they match
        root: process.cwd()
      }),
      // Build output shows module hashes instead of numerical module order, could be
      // useful for debugging or something I guess, disabled cause it adds 8kb and
      // doesn't seem worth it.
      // new webpack.HashedModuleIdsPlugin(),
      extractStylesPlugin
    ],

    // Produce warnings about file sizes
    performance: {
      hints: 'warning', // 'error' or false are valid too
      maxEntrypointSize: 2500000, // in bytes
      maxAssetSize: 450000 // in bytes
    }
  }
};
