'use strict'

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer')

/**
 * Returns the set of loaders for the passed opts including:
 * babel, sass, svgSprite, svgComponent, file, raw
 */
module.exports = ({ flags, paths, sassOptions }) => {
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: true,
      modules: {
        mode: 'global',
        localIdentName: '[name]-[local]--[hash:5]',
      },
    },
  }

  const sassLoader = {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
      sassOptions,
    },
  }

  const postCSSLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: true,
      postcssOptions: {
        plugins: [autoprefixer()],
      },
    },
  }

  return {
    // --- 🎉 JS Loader
    jsLoader: (overrides) => ({
      test: /\.(jsx?|tsx?)$/,
      include: paths.jsLoaderIncludes,
      /**
       * ## Using Eslint Loader
       * The `eslint-loader` will run imported modules through eslint first and
       * surface errors/warnings in the webpack build (These are also picked up by
       * the webpack-dev-server).
       *
       * **DEPENDENCIES**: This package only includes the eslint-loader package,
       * `eslint` and any packages required to run the eslint rules for a project
       * must be included by that project. This allows projects to handle
       * specifying and configuring eslint explicitly as required.
       */
      use: [
        { loader: 'babel-loader', options: { cacheDirectory: true } },
        { loader: 'eslint-loader' },
      ],
      ...overrides,
    }),

    // --- 📝 MDX Loader
    mdxLoader: (overrides) => ({
      test: /\.mdx$/,
      use: [
        { loader: 'babel-loader' },
        {
          loader: '@mdx-js/loader',
          options: {
            rehypePlugins: [],
            remarkPlugins: [],
          },
        },
      ],
      ...overrides,
    }),

    // --- 😍 Styles Loader
    sassLoader: (overrides) => ({
      test: /\.scss$/,
      use: flags.production
        ? // ℹ️ Prod styles are run through Autoprefixer for browser compatability
          // and extracted into a single separate stylesheet
          [MiniCssExtractPlugin.loader, cssLoader, postCSSLoader, sassLoader]
        : // ℹ️ Dev styles are injected into the DOM
          [{ loader: 'style-loader' }, cssLoader, sassLoader],
      ...overrides,
    }),

    // --- 📦 SVG icon sprite loader
    // Create an svg sprite with any icons imported into app
    svgSpriteLoader: (overrides) => ({
      test: /\.svg$/,
      include: paths.iconSpriteIncludes,
      use: [{ loader: 'svg-symbol-sprite-loader' }],
      ...overrides,
    }),

    // --- 👾 SVG to React Loader
    // Imported SVGs are converted to React components
    svgComponentLoader: (overrides) => ({
      test: /\.svg$/,
      // Make sure that we don't try to use with icons for svg sprite
      exclude: paths.iconSpriteIncludes,
      use: [
        {
          loader: '@svgr/webpack',
          // For some reason svgr configures svgo to strip out `viewbox` attrs
          // which makes it impossible to scale svgs... so fix that
          options: {
            svgo: true,
            svgoConfig: {
              plugins: [{ removeViewBox: false }],
            },
          },
        },
      ],
      ...overrides,
    }),

    // --- 🖼 Images Loader
    // Basic image loader setup with file name hashing
    fileLoader: (overrides) => ({
      test: /\.(jpe?g|png|gif)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
      ],
      ...overrides,
    }),

    // --- 📝 Text files Loader
    // If you want to import a text file you can ¯\_(ツ)_/¯
    rawLoader: (overrides) => ({
      test: /\.txt$/,
      use: [{ loader: 'raw-loader' }],
      ...overrides,
    }),
  }
}
