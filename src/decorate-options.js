'use strict'

const fs = require('fs')
const { join } = require('path')

/** Assign default values to any option not specified by consuming applicaiton */
module.exports = function decorateOptions({
  paths = {},
  devServer = {},
  target,
  ...rest
} = {}) {
  const { NODE_ENV } = process.env

  const flags = {
    mode: NODE_ENV,
    electron: target && target.includes('electron'),
    // NB: we only support production && !production targets
    development: NODE_ENV !== 'production',
    production: NODE_ENV === 'production',
  }

  // Handle default resolution of build specifics off of the source directory, this
  // enables easy source dir configuration without having to specify the path for
  // all downstream source paths
  const context = paths.context || fs.realpathSync(process.cwd())
  const appPublic = paths.appPublic || join(context, 'public')
  let appSrc = paths.appSrc || join(context, 'src')
  let outputPath = paths.outputPath || join(context, 'dist')
  let chunkHash = flags.production ? '.[chunkhash]' : ''

  // Default app src for electron projects is nested by process type
  if (flags.electron) {
    appSrc = join(context, 'src/renderer')
    outputPath = join(context, 'src/build')
    chunkHash = ''
  }

  // Default project configs used when not specified by consumer, see README for
  // details on values and usage
  // ⚠️ If you change these ensure that the docs in README are updated!
  return {
    chunkHash,
    devServer,
    flags,
    paths: {
      // --- Documented path options
      appPublic,
      appSrc,
      context,
      iconSpritePaths: [join(appSrc, 'media/icons')],
      outputPath,
      publicPath: '/',
      sassIncludePaths: [
        join(appSrc, '/styles'),
        flags.production ? join(appSrc, '/styles/prod') : join(appSrc, '/styles/dev'),
      ],

      // --- Addl file specific path options that can be overridden, but aren't
      // --- documented to keep the configs as simple as possible
      appEntry: join(appSrc, 'index.js'),
      htmlTemplate: join(appSrc, 'index.html'),
      jsLoaderPaths: [appSrc],

      // Overwrite the default path configs with any custom paths
      ...paths,
    },
    ...rest,
  }
}
