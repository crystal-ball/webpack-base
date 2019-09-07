'use strict'

/** Production environment specific configurations. */
module.exports = () => ({
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

  // Production plugins
  // ---------------------------------------------------------------------------
  plugins: [
    'namedModulesPlugin',
    'cleanPlugin',
    'duplicatePackageCheckerPlugin',
    'miniCSSExtractPlugin',
  ],
})
