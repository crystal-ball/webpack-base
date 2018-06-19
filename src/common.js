const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SVGSymbolSprite = require('svg-symbol-sprite-loader')
const { EnvironmentPlugin } = require('webpack')

/** The common configurations are used across environments */
module.exports = ({
  appEntry,
  appPublic,
  appSrc,
  context: projectContext,
  htmlTemplate,
  iconsSpriteLoaderInclude,
  outputFilename,
  outputPath,
  publicPath,
}) => ({
  // webpack v4+ automatic environment optimization switch
  // https://webpack.js.org/concepts/mode/
  mode: process.env.WEBPACK_SERVE ? 'development' : 'production',

  // Explicitly set the build context for resolving entry points and loaders
  // https://webpack.js.org/configuration/entry-context/#context
  context: projectContext,

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
    alias: {},
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
      // --- 📦 SVG icon sprite loader
      // Create an svg sprite with any icons imported into app
      {
        test: /\.svg$/,
        include: iconsSpriteLoaderInclude,
        use: [{ loader: 'svg-symbol-sprite-loader' }],
      },

      // --- 🖼 Images Loader
      // Basic image loader setup with file name hashing
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        // Make sure that we don't try to use file-loader with icons for svg sprite
        exclude: iconsSpriteLoaderInclude,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },

      // --- 📝 Text files Loader
      // If you want to import a text file you can ¯\_(ツ)_/¯
      {
        test: /\.txt$/,
        use: [{ loader: 'raw-loader' }],
      },
    ],
  },

  // Common plugins
  // ---------------------------------------------------------------------------
  plugins: [
    // --- 💉 Variable injections
    // Define environment variables in build.
    // ℹ️ Values passed to EnvironmentPlugin are defaults
    new EnvironmentPlugin({
      DEBUG: false,
      PUBLIC_PATH: publicPath, // useful for routing and media from /public dir
    }),

    // --- 📦 HTML index generator
    // Generates index.html with injected script/style resources paths
    new HtmlWebpackPlugin({
      favicon: `${appPublic}/favicon.ico`,
      minify: false,
      template: htmlTemplate,
    }),

    // --- 📦 Asset extractions
    // Plugin for SVG symbol sprite extracts imported SVGs into a file
    // ⚠️ Order is important, this plugin must be included after HTML plugin so that
    // HTML plugin hooks are pre-registered!
    new SVGSymbolSprite.Plugin({
      filename: 'static/media/icon-sprite.[contenthash].svg',
    }),

    // --- 🖨 File copying
    // Copy public directory to build directory, this is an escape hatch for assets
    // needed that are not imported into build
    new CopyWebpackPlugin([{ from: appPublic }]),
  ],
})