const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer')
const postCSSCustomProperties = require('postcss-custom-properties')

/**
 * Returns the set of loaders for the passed opts including:
 * babel, sass, svgSprite, svgComponent, file, raw
 */
module.exports = ({
  babelLoaderInclude,
  iconsSpriteLoaderInclude,
  isProduction,
  sassIncludePaths,
}) => ({
  // --- 🎉 JS Loader
  babel: isProduction
    ? {
        // Production JS loader does not use ESLint. Tests should be used for catching
        // linting errors and prod builds take long enough w/out ESLint
        test: /\.jsx?$/,
        include: babelLoaderInclude,
        use: [{ loader: 'babel-loader' }],
      }
    : {
        // Dev JS loader runs source through ESLint then Babel
        test: /\.jsx?$/,
        // Only use loader with explicitly included files
        include: babelLoaderInclude,
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
        use: [{ loader: 'babel-loader' }, { loader: 'eslint-loader' }],
      },

  // --- 😍 Styles Loader
  sass: isProduction
    ? {
        // ℹ️ Prod styles uses SCSS+CSS loader chain to import, includes
        // PostCSS+Autoprefixer for browser compatability, and extracts final styles
        // into a separate stylesheet
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
      }
    : {
        // ℹ️ Dev styles uses SASS+CSS loader chain and injects results into DOM
        test: /\.scss$/,
        use: [
          // In dev the style loader injects imported styles into the DOM, this is
          // replaced with the MiniCSSExtract in production
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              localIdentName: '[name]-[local]--[hash:5]',
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

  // --- 📦 SVG icon sprite loader
  // Create an svg sprite with any icons imported into app
  svgSprite: {
    test: /\.svg$/,
    include: iconsSpriteLoaderInclude,
    use: [{ loader: 'svg-symbol-sprite-loader' }],
  },

  // --- 🔢 SVG to React Loader
  // Imported SVGs are converted to React components
  svgComponent: {
    test: /\.svg$/,
    // Make sure that we don't try to use with icons for svg sprite
    exclude: iconsSpriteLoaderInclude,
    use: [{ loader: '@svgr/webpack' }],
  },

  // --- 🖼 Images Loader
  // Basic image loader setup with file name hashing
  file: {
    test: /\.(jpe?g|png|gif)$/i,
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
  raw: {
    test: /\.txt$/,
    use: [{ loader: 'raw-loader' }],
  },
})
