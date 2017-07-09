'use strict';
const webpack = require('webpack');
const BabiliPlugin = require('babili-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// ========================================================
// Webpack Production Environment Configurations
// ========================================================

// ExtractTextPlugin pulls SASS into external css file
const extractStylesPlugin = new ExtractTextPlugin({
  // Include content hash so that only CSS changes (and not changes to JS will
  // invalidate css bundle)
  filename: '[name].[contenthash].css',
});

module.exports = paths => {
  return {
    // Fail out on the first error instead of tolerating it.
    bail: true,

    // Real source maps for production builds
    devtool: 'source-map',

    // Produce warnings about file sizes
    performance: {
      hints: 'warning', // 'error' or false are valid too
      maxEntrypointSize: 2500000, // in bytes
      maxAssetSize: 450000, // in bytes
    },

    // CSS Loader Definition - Prod
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: extractStylesPlugin.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader' },
              {
                loader: 'sass-loader',
                options: {
                  // src/styles allows easy theme variable import
                  includePaths: ['src/styles'],
                },
              },
            ],
          }),
        },
      ],
    },

    plugins: [
      // Clean /dist folder
      new CleanWebpackPlugin([paths.appDist], {
        // root is required b/c our paths are absolute and clean makes sure they match
        root: process.cwd(),
      }),
      extractStylesPlugin,
      // Replace process.env.NODE_ENV references with production, allows Babili to
      // strip dead code based on env
      new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
      // LoaderOptions is to help loaders migrating from webpack v1 to v2, and makes
      // options globally available to loaders. Remove soon.
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      }),
      // CONCATENATE ALL THEM MODULES!!! (Scope Hoisting)
      new webpack.optimize.ModuleConcatenationPlugin(),
      // Uglify with Babili
      new BabiliPlugin(),
      // Build output shows module hashes instead of numerical module order, could be
      // useful for debugging or something I guess, disabled cause it adds 8kb and
      // doesn't seem worth it.
      // new webpack.HashedModuleIdsPlugin(),
    ],
  };
};
