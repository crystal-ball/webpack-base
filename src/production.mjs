import CleanWebpackPlugin from 'clean-webpack-plugin'
import DuplicatePackageCheckerPlugin from 'duplicate-package-checker-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import MinifyPlugin from 'babel-minify-webpack-plugin'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
import WebpackMonitor from 'webpack-monitor'
import autoprefixer from 'autoprefixer'
import chalk from 'chalk'
import webpack from 'webpack'

/**
 * Production environment specific configurations.
 * @param {Object} paths Configured paths for environment build
 * @return {Object} Production specific configurations to merge with cross
 *                  environment configurations
 */
export default ({ babelLoaderInclude, outputPath }) => ({
  // Fail out on the first error instead of tolerating it.
  bail: true,

  // Real source maps for production builds
  // devtool: 'source-map',
  // Do not use 'source-map' until 🐛 is resolved:
  // https://github.com/webpack-contrib/babel-minify-webpack-plugin/issues/68
  devtool: 'cheap-module-source-map',

  // Produce warnings about file sizes
  performance: {
    hints: 'warning', // 'error' or false are valid too
    maxEntrypointSize: 2500000, // in bytes
    maxAssetSize: 450000, // in bytes
  },

  // Build stats output configuration
  stats: {
    // We don't care about the source maps output
    excludeAssets: assetName => assetName.includes('.map'),
    // The modules output doesn't tell us much ¯\_(ツ)_/¯
    modules: false,
  },

  // CSS Loader Definition - Prod
  module: {
    rules: [
      // Production JS loader does not use ESLint. Tests should be used for catching
      // linting errors and prod builds take long enough w/out ESLint
      {
        test: /\.jsx?$/,
        // Only use loader with explicitly included files
        include: babelLoaderInclude,
        use: [{ loader: 'babel-loader' }],
      },
      // Prod styles are run through autoprefixer and extracted into a separate file
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                localIdentName: '[name]-[local]--[hash:base64:5]',
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
    // Stats
    // ---------------------------------------------------------------------------
    // Progress Indicator
    new ProgressBarPlugin({
      format: `  Hacking time... [:bar] ${chalk.green.bold(
        ':percent',
      )} (:elapsed seconds) :msg`,
      clear: false,
      callback: () => {
        console.log(chalk.bold('\n  BINGO 🎉\n'))
      },
    }),
    // Totally awesome webpack build stats monitor, run `npm run build:monitor` to
    // launch the monitor after building
    new WebpackMonitor({
      launch: process.env.LAUNCH_MONITOR,
    }),

    // Prepare
    // ---------------------------------------------------------------------------
    // Clean /dist folder
    new CleanWebpackPlugin([outputPath], {
      // root is required b/c our paths are absolute and clean makes sure they match
      root: process.cwd(),
    }),

    // Validations
    // ---------------------------------------------------------------------------
    // Check for duplicate versions of the same package, ie React 15 && React 16
    // in the same build
    new DuplicatePackageCheckerPlugin({
      verbose: true, // Show module that is requiring each duplicate package
      emitError: true, // Emit errors instead of warnings
    }),

    // Optimizations
    // ---------------------------------------------------------------------------
    // ExtractTextPlugin pulls SASS into external css file
    new ExtractTextPlugin({
      // Include content hash so that only CSS changes (and not changes to JS will
      // invalidate css bundle)
      filename: 'static/css/[name].[contenthash].css',
    }),
    // LoaderOptions is to help loaders migrating from webpack v1 to v2, and makes
    // options globally available to loaders. Remove soon.
    // new webpack.LoaderOptionsPlugin({
    //   minimize: true,
    //   debug: false,
    // }),
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
