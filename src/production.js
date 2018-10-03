const CleanWebpackPlugin = require('clean-webpack-plugin')
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackMonitor = require('webpack-monitor')
const autoprefixer = require('autoprefixer')
const postCSSCustomProperties = require('postcss-custom-properties')
const { NamedModulesPlugin } = require('webpack')

/** Production environment specific configurations. */
module.exports = ({ babelLoaderInclude, chunkHash, outputPath, sassIncludePaths }) => ({
  // Fail out on the first error instead of tolerating it.
  bail: true,

  // Real source maps for production builds
  devtool: 'source-map',

  // Produce warnings about file sizes
  performance: {
    hints: 'warning', // 'error' or false are valid too
    maxEntrypointSize: 500000, // ~500Kb
    maxAssetSize: 250000, // ~250Kb
    // Don't warn about image file sizes
    assetFilter: assetFilename => !/\.(map|jpe?g|png|gif|svg)$/i.test(assetFilename),
  },

  // Build stats output configuration
  stats: {
    // We don't care about the source maps output, exclude them
    excludeAssets: assetName => assetName.includes('.map'),
    // Suppress the modules output, it doesn't tell us much ¯\_(ツ)_/¯ and adds a
    // lot of noise to the build stats
    modules: false,
  },

  // Production loaders
  // ---------------------------------------------------------------------------
  module: {
    rules: [
      // --- 🎉 JS Loader
      // Production JS loader does not use ESLint. Tests should be used for catching
      // linting errors and prod builds take long enough w/out ESLint
      {
        test: /\.jsx?$/,
        include: babelLoaderInclude,
        use: [{ loader: 'babel-loader' }],
      },

      // --- 😍 Styles Loader
      // ℹ️ Prod styles uses SCSS+CSS loader chain to import, includes
      // PostCSS+Autoprefixer for browser compatability, and extracts final styles
      // into a separate stylesheet
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              localIdentName: '[name]-[local]--[hash:5]',
            },
          },
          {
            // Use postcss to run CSS through autoprefixer and css variables
            // transform
            loader: 'postcss-loader',
            options: {
              plugins: [postCSSCustomProperties(), autoprefixer()],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              // Allows for aliased imports from include paths, especially useful
              // for importing app theme variables and mixins into component styles
              includePaths: sassIncludePaths,
            },
          },
        ],
      },
    ],
  },

  // Production plugins
  // ---------------------------------------------------------------------------
  plugins: [
    // --- 🛣 Modules
    // Uses the relative path of a module for the module id instead of the module
    // index. This produces more consistent module ids across builds b/c the path
    // changes much less frequently than the index. Apparently consistent module ids
    // is a good thing in webpack land.
    // ℹ️ We use NamedModulesPlugin b/c the paths gzip better than the hashes
    // produced by the HashedModuleIdsPlugin!
    new NamedModulesPlugin(),

    // --- ℹ️ Stats
    // Totally awesome webpack build stats monitor, run `npm run build:monitor` to
    // launch the monitor after building
    new WebpackMonitor({
      launch: process.env.LAUNCH_MONITOR,
    }),

    // --- 📦 Build Prep
    // Wipe output folder before the build
    new CleanWebpackPlugin([outputPath], {
      // root is required b/c our paths are absolute and clean makes sure they match
      root: process.cwd(),
    }),

    // --- ✅ Validations + Optimizations
    // Check for duplicate versions of the same package, ie React 15 && React 16
    // in the same build
    new DuplicatePackageCheckerPlugin({
      verbose: true, // Show module that is requiring each duplicate package
    }),

    // Extract CSS
    new MiniCssExtractPlugin({ filename: `static/css/[name]${chunkHash}.css` }),
  ],
})
