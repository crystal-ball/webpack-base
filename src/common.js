const { resolve } = require('path')

/** The common configurations are used across environments */
module.exports = ({
  appEntry,
  appSrc,
  context,
  mode,
  outputFilename,
  outputPath,
  publicPath,
}) => ({
  // webpack v4+ automatic environment optimization switch
  // https://webpack.js.org/concepts/mode/
  mode,

  // Explicitly set the build context for resolving entry points and loaders
  // https://webpack.js.org/configuration/entry-context/#context
  context,

  // Default to a single entry and let webpack automatically split and name bundles
  // https://webpack.js.org/configuration/entry-context/#entry
  entry: appEntry,

  // Default to webpack /dist output with hashed filenames in prod builds for long
  // term caching, see README for docs on config effects
  // https://webpack.js.org/configuration/output/
  output: {
    path: outputPath,
    filename: outputFilename,
    publicPath,
    // Configures the lengths of [hash] and [chunkhash] globally
    hashDigestLength: 12,
  },

  // These options change how modules are resolved.
  // https://webpack.js.org/configuration/resolve/
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    // Tell webpack what directories should be searched when resolving modules.
    // Including `appSrc` allows for importing modules relative to /src directory!
    modules: [appSrc, 'node_modules'],
    // Alias can be used to point imports to specific modules, include empty object
    // to allow direct assignment in consuming packages
    alias: {
      // Short term fix to resolve duplicate versions of warning being imported
      // when using react-router,
      // see: https://github.com/ReactTraining/history/issues/601
      warning: resolve(context, 'node_modules/warning'),
    },
  },

  // Configure the SplitChunksPlugin to split vendor, runtime and main chunks
  // https://webpack.js.org/plugins/split-chunks-plugin/
  optimization: {
    splitChunks: {
      // 'All' is required to split vendor even when dynamic modules aren't used
      // See https://webpack.js.org/plugins/split-chunks-plugin/#optimization-splitchunks-chunks-all
      // See https://twitter.com/wSokra/status/969633336732905474
      chunks: 'all',
      // Use names instead of numbers for bundles
      name: true,
    },
    // Keep the runtime chunk seperated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    runtimeChunk: true,
  },

  // Common loaders
  // ---------------------------------------------------------------------------
  module: {
    rules: ['svgSprite', 'svgComponent', 'file', 'raw', 'babel', 'sass'],
  },

  // Common plugins
  // ---------------------------------------------------------------------------
  plugins: ['progressBar', 'environment', 'html', 'svgSymbolSprite', 'copy'],
})
