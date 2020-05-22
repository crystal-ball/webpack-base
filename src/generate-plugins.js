'use strict'

const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const SVGSymbolSprite = require('svg-symbol-sprite-loader')
const chalk = require('chalk')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const {
  EnvironmentPlugin,
  HotModuleReplacementPlugin,
  NamedModulesPlugin,
} = require('webpack')

/**
 * Returns the set of plugins for the passed opts including:
 * clean, copy, duplicatePackageChecker, environment, friendlyErrors,
 * hotModuleReplacement, html, miniCSSExtract, namedModules, progressBar,
 * svgSymbolSprite
 */
module.exports = ({ chunkHash, devServer, envVars, flags, publicPath, paths }) => ({
  // --------------------------------------------------------
  // ✅ Path validation
  // Ensure that import paths are case sensitive to ensure Linux/MacOS  compatability
  caseSensitivePathsPlugin: new CaseSensitivePathsPlugin(),

  // --- 📦 Build Prep
  // Wipe output folder before the build
  cleanPlugin: new CleanWebpackPlugin(),

  // --- 🖨 File copying
  // Copy public directory to build directory, this is an escape hatch for assets
  // needed that are not imported into build
  copyPlugin: new CopyWebpackPlugin({ patterns: [paths.static] }),

  // --- ✅ Validations + Optimizations
  // Check for duplicate versions of the same package, ie React 15 && React 16
  // in the same build
  duplicatePackageCheckerPlugin: new DuplicatePackageCheckerPlugin({
    verbose: true, // Show module that is requiring each duplicate package
  }),

  // --- 💉 Variable injections
  // Define environment variables in build.
  // ℹ️ Values passed to EnvironmentPlugin are defaults
  environmentPlugin: new EnvironmentPlugin({
    DEBUG: false,
    PUBLIC_PATH: publicPath, // useful for routing and media from /public dir
    ...envVars,
  }),

  // --- ℹ️ Logging
  // Shows and clears errors in a easier to read format
  friendlyErrorsPlugin: new FriendlyErrorsWebpackPlugin({
    compilationSuccessInfo: {
      messages: [
        `  🎉  ${chalk.green.bold('BINGO')} 🎉`,
        `  Application running at ${chalk.blue.underline(
          `http://${devServer.host || 'localhost'}:${devServer.port || 3000}`,
        )}`,
      ],
      notes: [
        `webpack output is served from ${publicPath}`,
        `Content not from webpack is served from ${paths.static}`,
        `404s will fallback to /index.html`,
      ],
    },
  }),

  // --- 🔥 Hot Module Replacement
  // See: https://webpack.js.org/concepts/hot-module-replacement/
  hotModuleReplacementPlugin: new HotModuleReplacementPlugin(),

  // --- 📦 HTML index generator
  // Generates index.html with injected script/style resources paths
  htmlPlugin: new HtmlWebpackPlugin({
    favicon: `${paths.static}/favicon.ico`,
    inject: !flags.electron,
    minify: false,
    template: paths.htmlTemplate,
  }),

  // --- 😍 Styles extractions
  miniCSSExtractPlugin: new MiniCssExtractPlugin({
    filename: `static/css/[name]${chunkHash}.css`,
  }),

  // --- 🛣 Modules
  // Uses the relative path of a module for the module id instead of the module
  // index. This produces more consistent module ids across builds b/c the path
  // changes much less frequently than the index. Apparently consistent module ids
  // is a good thing in webpack land.
  // ℹ️ We use NamedModulesPlugin b/c the paths gzip better than the hashes
  // produced by the HashedModuleIdsPlugin!
  namedModulesPlugin: new NamedModulesPlugin(),

  // --- 🔢 Stats
  // Visual compile indicator with progress bar
  progressBarPlugin: new ProgressBarPlugin({
    /* eslint-disable no-console */
    callback: () => console.log(`\n  🎉  ${chalk.bold('BINGO')} 🎉\n`),
    /* eslint-enable no-console */
    clear: false, // Don't clear the bar on completion
    format: `  Hacking time... [:bar] ${chalk.green.bold(
      ':percent',
    )} (:elapsed seconds) :msg`,
  }),

  // --- 📦 Asset extractions
  // Plugin for SVG symbol sprite extracts imported SVGs into a file
  // ⚠️ Order is important, this plugin must be included after HTML plugin so that
  // HTML plugin hooks are pre-registered!
  svgSymbolSpritePlugin: new SVGSymbolSprite.Plugin({
    filename: `static/media/icon-sprite${chunkHash}.svg`,
    // Don't inject the sprite id in electron and storybook targets because the
    // HTML plugin might be different (Storybook) or the app will just always
    // fetch it (both)
    injectSpriteId: !(flags.electron || flags.storybook),
  }),
})
