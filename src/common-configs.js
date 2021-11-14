'use strict'

const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin')

/** The common configurations are used across environments */
module.exports = ({ fileHash, flags, paths, publicPath }) => ({
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
    filename: `static/js/[name]${fileHash}.js`,
    // The publicPath value is prefixed to every URL created by the runtime or
    // loaders. The default is '' which means resources from nested routes have
    // incorrect paths, eg: 'some/application/route/static/js/main.js
    // The default config set here ensures that requests are absolute, eg:
    // '/static/js/main.js'
    publicPath,
    // Configures the lengths of [contenthash] globally
    hashDigestLength: 12,
  },

  // These options change how modules are resolved.
  // https://webpack.js.org/configuration/resolve/
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    // Alias can be used to point imports to specific modules, include empty
    // object to allow direct assignment in consuming packages
    alias: {},
  },

  // Optimization tweaks for A++ asset caching
  optimization: {
    // Use hashed module ids instead of incrementing module ids so they are consistent
    // across module resolution order changes
    // ref: https://webpack.js.org/guides/caching/#module-identifiers
    moduleIds: 'deterministic',
    // Keep the runtime chunk seperated to enable long term caching
    // Ref: https://webpack.js.org/guides/caching/#extracting-boilerplate
    runtimeChunk: 'single',
    // ref: https://webpack.js.org/plugins/split-chunks-plugin/
    splitChunks: {
      // This indicates which chunks will be selected for optimization, setting
      // 'all' mmeans that chunks can be shared even between async and non-async
      // chunks.
      // ref: https://webpack.js.org/plugins/split-chunks-plugin/#splitchunkschunks
      chunks: 'all',
    },
    // Configured minimizers for uglifying assets in production builds
    minimizer: [
      '...', // The `...` syntax extends existing minimizers (i.e. `terser-webpack-plugin`)
      new CSSMinimizerPlugin(),
    ],
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
    'environmentPlugin',
    'copyPlugin',
    // ℹ️ HTML plugin must come before the SVG sprite plugin b/c it uses
    // lifecycle hooks registered by the HTML plugin to inject resources into
    // generated app index.html
    'htmlPlugin',
    'svgSymbolSpritePlugin',
  ],
})
