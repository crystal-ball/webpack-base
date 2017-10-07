import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import DuplicatePackageCheckerPlugin from 'duplicate-package-checker-webpack-plugin'
import StatsVisualizer from 'webpack-visualizer-plugin'
import MinifyPlugin from 'babel-minify-webpack-plugin'
import autoprefixer from 'autoprefixer'

/**
 * Production environment specific configurations.
 * @param {Object} paths Configured paths for environment build
 * @return {Object} Production specific configurations to merge with cross
 *                  environment configurations
 */
export default ({ outputPath }) => ({
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                localIdentName: '[name][local]--[hash:base64:5]',
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [autoprefixer()],
              },
            },
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
    new CleanWebpackPlugin([outputPath], {
      // root is required b/c our paths are absolute and clean makes sure they match
      root: process.cwd(),
    }),
    // Webpack Visualizer plugin outputs stats visualizer to output/stats.html
    new StatsVisualizer(),
    // Check for duplicate versions of the same package, ie React 15 && React 16
    // in the same build
    new DuplicatePackageCheckerPlugin({
      verbose: true, // Show module that is requiring each duplicate package
      emitError: true, // Emit errors instead of warnings
    }),
    // ExtractTextPlugin pulls SASS into external css file
    new ExtractTextPlugin({
      // Include content hash so that only CSS changes (and not changes to JS will
      // invalidate css bundle)
      filename: 'static/css/[name].[contenthash].css',
    }),
    // LoaderOptions is to help loaders migrating from webpack v1 to v2, and makes
    // options globally available to loaders. Remove soon.
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    // CONCATENATE ALL THEM MODULES!!! (Scope Hoisting)
    new webpack.optimize.ModuleConcatenationPlugin(),
    // Uglify with Babili
    new MinifyPlugin(),
    // Build output shows module hashes instead of numerical module order, could be
    // useful for debugging or something I guess, disabled cause it adds 8kb and
    // doesn't seem worth it.
    // new webpack.HashedModuleIdsPlugin(),
  ],
})
