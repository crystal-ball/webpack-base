'use strict';
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// ========================================================
// Webpack Development+Production Common Configurations
// See guides/architecture - Webpack
// ========================================================

/* NOTE:
 * - Define chunks plugins for vendor && manifest chunks
 * - Define JS loader with ESLint
 * - Define HTML loader
 */

module.exports = paths => {
  // Override paths with any custom paths

  return {
    // These options change how modules are resolved.
    // https://webpack.js.org/configuration/resolve/
    resolve: {
      // Tell webpack what directories should be searched when resolving modules.
      // This allows for importing modules relative to src/ directory!
      modules: [paths.appNodeModules, paths.appSrc],
    },

    // resolveLoader: {
    //   modules: [
    //     path.resolve(__dirname, '..', 'node_modules'),
    //     path.resolve('node_modules')
    //   ]
    // },

    output: {
      path: paths.appDist,
      // Entry chunks are emitted by name
      filename: '[name].js',
      // The public URL of the output directory when referenced in a browser
      // (The value of the option is prefixed to every URL created by the runtime or loaders)
      // Serve all external resources like images and files from /
      publicPath: '/',
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: 'pre',
          // Explicit include for Babel transpiling
          include: paths.babelLoaderInclude,
          use: [
            //https://github.com/babel/babel-loader/issues/166
            { loader: 'babel-loader' },
            { loader: 'eslint-loader' },
          ],
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: [
            { loader: 'file-loader?name=[name].[hash:8].[ext]' },
          ],
        },
      ],
    },

    plugins: [
      // Pull node_modules into vendor.js file using CommonsChunk, minChunks handles
      // checking if module is from node_modules and is a js file
      // see https://survivejs.com/webpack/building/bundle-splitting/#loading-dependencies-to-a-vendor-bundle-automatically
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: ({ resource }) => (
          resource &&
          resource.indexOf('node_modules') >= 0 &&
          resource.match(/\.js$/)
        ),
      }),
      // Extract manifest into separate chunk so that changes to the app src don't
      // invalidate the vendor bundle
      // https://survivejs.com/webpack/optimizing/separating-manifest/#extracting-a-manifest
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        minChunks: Infinity,
      }),
      new HtmlWebpackPlugin({
        inject: true,
        template: paths.appHtml,
      }),
    ],
  };
};
