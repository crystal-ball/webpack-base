import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import InlineChunkManifestHtmlWebpackPlugin from 'inline-chunk-manifest-html-webpack-plugin'
import WebpackManifestPlugin from 'webpack-manifest-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import SVGSymbolSpritePlugin from 'svg-symbol-sprite-loader/src/plugin'
import NyanProgressPlugin from 'nyan-progress-webpack-plugin'

const { optimize, DefinePlugin, EnvironmentPlugin } = webpack

/**
 * Cross environment common configurations. The development or production configs
 * will be merged with these base configs using `webpack-merge`
 * @param {Object} paths Configured paths for environment build
 * @return {Object} Build configurations common to all environments
 */
export default ({
  appEntry,
  appPublic,
  appSrc,
  context,
  htmlTemplate,
  iconsSpriteLoader,
  nodeModules,
  outputFilename,
  outputPath,
  publicPath,
}) => ({
  // Explicitly set the build context for resolving entry points and loaders
  // See: https://webpack.js.org/configuration/entry-context/#context
  context,

  entry: {
    app: appEntry,
  },

  output: {
    path: outputPath,
    // Entry chunks are emitted by name
    filename: outputFilename,
    // The public URL of the output directory when referenced in a browser
    // (The value of the option is prefixed to every URL created by the runtime or loaders)
    // Value: Serve all resources from /assets/, eg: /assets/app.js
    publicPath,
  },

  // These options change how modules are resolved.
  // https://webpack.js.org/configuration/resolve/
  resolve: {
    // Allow resolving js and jsx files
    extensions: ['.js', '.jsx', '.json'],
    // Tell webpack what directories should be searched when resolving modules.
    // Including `appSrc` allows for importing modules relative to /src directory!
    modules: [nodeModules, appSrc],
    // Alias can be used to point imports to specific modules
    alias: {},
  },

  // Module
  // ---------------------------------------------------------------------------
  module: {
    rules: [
      // SVG Icons loader will create an svg sprite with any icons in the include
      {
        test: /\.svg$/,
        include: iconsSpriteLoader,
        use: [{ loader: 'svg-symbol-sprite-loader' }],
      },
      // Basic image loader setup to use file-loader, configured to include hash
      // in filenames
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        // Make sure that we don't try to use file-loader with icons for svg sprite
        exclude: iconsSpriteLoader,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:8].[ext]',
              outputPath: 'static/media/',
            },
          },
        ],
      },
      // The raw loader is available for importing .txt files
      {
        test: /\.txt$/,
        use: [{ loader: 'raw-loader' }],
      },
    ],
  },

  // Plugins
  // ---------------------------------------------------------------------------
  plugins: [
    // Builds dashboard
    // ---------------------------------------------------------------------------

    // Visual progress indicator
    new NyanProgressPlugin({
      nyanCatSays(progress) {
        return progress === 1 ? 'Bringo!' : 'Hacking time...'
      },
    }),

    // Variable injections
    // ---------------------------------------------------------------------------

    // Inject build related environment variables. They will be accessible as
    // constants. Replacing NODE_ENV allows Babili to strip dead code based on env
    // The PUBLIC_PATH constant is useful for non imported media and routing
    new EnvironmentPlugin(['NODE_ENV']),
    new DefinePlugin({ 'process.env.PUBLIC_PATH': JSON.stringify(publicPath) }),

    // Asset extractions
    // ---------------------------------------------------------------------------

    // Plugin for SVG symbol sprite extracts imported SVGs into a file
    // ⚠️ Plugin order matters! This plugin and the WebpackManifestPlugin/
    // InlineChunkManifestHtmlWebpackPlugin hook into the compiler 'emit' event.
    // This plugin must run first so that the generated sprite can be added to the
    // build chunks before the manifest plugin checks what chunks are in the build!
    new SVGSymbolSpritePlugin({
      filename: 'static/media/icon-sprite.[hash:8].svg',
    }),

    // Files copying
    // ---------------------------------------------------------------------------

    // Copy public directory to build directory, this is an escape hatch for assets
    // needed that are not imported into build
    new CopyWebpackPlugin([{ from: 'public' }]),

    // index.html generator
    // ---------------------------------------------------------------------------

    // Inlines the chunk manifest in head, this is explicitly required to know which
    // version of the SVG sprite is correct, but is also nice to have for reference
    new InlineChunkManifestHtmlWebpackPlugin({
      // The default chunk manifest plugin only includes .js files for some reason,
      // override with `webpack-manifest-plugin` to include all emitted assets
      manifestPlugins: [
        new WebpackManifestPlugin({
          // Don't include sourcemaps in manifest, they ugly
          filter: ({ name }) => !name.includes('.map'),
        }),
      ],
      manifestVariable: 'manifest',
      // Option to suppress output of `manifest.json`, added here as a reminder of
      // option, but currently seems fine to output additional asset
      // dropAsset: true,
    }),

    // Generates index.html with injected script/style resources paths
    new HtmlWebpackPlugin({
      inject: true,
      template: htmlTemplate,
      favicon: `${appPublic}/favicon.ico`,
    }),

    // Configure chunks
    // ---------------------------------------------------------------------------

    // Pull node_modules into vendor.js file using CommonsChunk, minChunks handles
    // checking if module is from node_modules and is a js/json file see
    // https://survivejs.com/webpack/building/bundle-splitting/
    // #loading-dependencies-to-a-vendor-bundle-automatically
    new optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({ resource }) =>
        resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/\.(js|json)$/),
    }),

    // Extract manifest into separate chunk so that changes to the app src don't
    // invalidate the vendor bundle
    // https://survivejs.com/webpack/optimizing/separating-manifest/#extracting-a-manifest
    new optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
  ],
})
