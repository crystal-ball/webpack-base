const CleanWebpackPlugin = require('clean-webpack-plugin')
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const WebpackMonitor = require('webpack-monitor')
const autoprefixer = require('autoprefixer')
const { optimize } = require('webpack')

/**
 * Production environment specific configurations.
 * @param {Object} configs Configured paths for environment build
 * @return {Object} Production specific configurations to merge with cross
 * environment configurations
 */
module.exports = ({
  babelLoaderInclude,
  outputPath,
  sassIncludePaths,
  svgSprites,
}) => ({
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

  // Build stats output configuration
  stats: {
    // We don't care about the source maps output
    excludeAssets: assetName => assetName.includes('.map'),
    // Suppress the modules output, it doesn't tell us much ¯\_(ツ)_/¯ and adds a
    // lot of noise to the build stats
    modules: false,
  },

  // Prod Loader Definitions
  // ---------------------------------------------------------------------------
  module: {
    rules: [
      // ========================================================
      // JS Loader
      // ========================================================

      // Production JS loader does not use ESLint. Tests should be used for catching
      // linting errors and prod builds take long enough w/out ESLint
      {
        test: /\.jsx?$/,
        // Only use loader with explicitly included files
        include: babelLoaderInclude,
        use: [
          { loader: 'babel-loader' },
          ...svgSprites, // Import those svgs!
        ],
      },

      // ========================================================
      // Styles Loader
      // ========================================================

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
                includePaths: sassIncludePaths,
              },
            },
          ],
        }),
      },
    ],
  },

  // Prod Plugin Definitions
  // ---------------------------------------------------------------------------
  plugins: [
    // ========================================================
    // Stats
    // ========================================================

    // Totally awesome webpack build stats monitor, run `npm run build:monitor` to
    // launch the monitor after building
    new WebpackMonitor({
      launch: process.env.LAUNCH_MONITOR,
    }),

    // ========================================================
    // Build Prep
    // ========================================================

    // Wipe output folder before the build
    new CleanWebpackPlugin([outputPath], {
      // root is required b/c our paths are absolute and clean makes sure they match
      root: process.cwd(),
    }),

    // ========================================================
    // Validations + Optimizations
    // ========================================================

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
    // CONCATENATE ALL THEM MODULES!!! (Scope Hoisting)
    new optimize.ModuleConcatenationPlugin(),
    // 🏎 Minify/compress/mangle etc
    new UglifyJsPlugin({
      sourceMap: true,
    }),
  ],
})
