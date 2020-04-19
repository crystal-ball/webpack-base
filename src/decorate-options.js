'use strict'

const fs = require('fs')
const { join } = require('path')

/** Assign default values to any option not specified by consuming applicaiton */
module.exports = function decorateOptions({ paths = {}, target, ...rest } = {}) {
  const { NODE_ENV } = process.env

  const flags = {
    mode: NODE_ENV,
    storybook: target && target.includes('storybook'),
    electron: target && target.includes('electron'),
    development: NODE_ENV !== 'production',
    production: NODE_ENV === 'production',
  }

  // Determine default paths for context and src directories which are used to
  // build other paths, this enables configuring the src dir to a custom path
  // without having to configure every single other src dependent path
  const context = paths.context || fs.realpathSync(process.cwd())
  const src = paths.src || join(context, 'src', flags.electron ? 'renderer' : '')

  const defaults = {
    chunkHash: flags.production ? '.[chunkhash]' : '',
    devServer: {},
    flags,
    publicPath: '/',
    sassOptions: {},
    paths: {
      context,
      output: join(context, 'public'),
      static: join(context, 'static'),
      appIndex: join(src, 'index.js'),
      htmlTemplate: join(src, 'index.html'),
      iconSpriteIncludes: [join(src, 'media/icons')],
      jsLoaderIncludes: [src],
    },
  }

  if (flags.electron) {
    // In Electron we always load the files from disk because it's always fast
    // and simplifies the electron loading configs.
    defaults.chunkHash = ''
    defaults.paths.output = join(context, 'src/build')
  }

  // Return package defaults merged with project overrides
  return {
    ...defaults,
    ...rest,
    paths: {
      ...defaults.paths,
      ...paths,
    },
  }
}
