'use strict'

const path = require('path')

/** The common configurations are used across environments */
module.exports = ({ chunkHash, publicPath, flags, paths }) => ({
  // webpack v4+ automatic environment optimization switch
  // https://webpack.js.org/concepts/mode/
  mode: flags.mode,

  // Explicitly set the build context for resolving entry points and loaders
  // https://webpack.js.org/configuration/entry-context/#context
  context: paths.context,

  // Default to a single entry and let webpack automatically split and name bundles
  // https://webpack.js.org/configuration/entry-context/#entry
  entry: paths.appIndex,

  // Default to webpack /dist output with hashed filenames in prod builds for long
  // term caching, see README for docs on config effects
  // https://webpack.js.org/configuration/output/
  output: {
    path: paths.output,
    filename: `static/js/[name]${chunkHash}.js`,
    // The publicPath value is prefixed to every URL created by the runtime or
    // loaders. The default is '' which means resources from nested routes have
    // incorrect paths, eg: 'some/application/route/static/js/main.js
    // The default config set here ensures that requests are absolute, eg:
    // '/static/js/main.js'
    publicPath,
    // Configures the lengths of [hash] and [chunkhash] globally
    hashDigestLength: 12,
  },

  // These options change how modules are resolved.
  // https://webpack.js.org/configuration/resolve/
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    // Alias can be used to point imports to specific modules, include empty
    // object to allow direct assignment in consuming packages
    alias: {
      // Ensure that only one @babel/runtime is bundled into application
      '@babel/runtime': path.resolve(paths.context, 'node_modules/@babel/runtime'),
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
    rules: [
      'jsLoader',
      'mdxLoader',
      'sassLoader',
      'svgSpriteLoader',
      'svgComponentLoader',
      'fileLoader',
      'rawLoader',
    ],
  },

  // Common plugins
  // ---------------------------------------------------------------------------
  plugins: [
    'caseSensitivePathsPlugin',
    'progressBarPlugin',
    'environmentPlugin',
    'copyPlugin',
    // ℹ️ HTML plugin must come before the SVG sprite plugin b/c it uses
    // lifecycle hooks registered by the HTML plugin to inject resources into
    // generated app index.html
    'htmlPlugin',
    'svgSymbolSpritePlugin',
  ],
})
