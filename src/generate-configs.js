const fs = require('fs')
const { join } = require('path')

/** Assign default values to any option not specified by consuming applicaiton */
module.exports = function generateConfigs({
  mode,
  electron,
  paths = {},
  devServer = {},
} = {}) {
  // Handle default resolution of build specifics off of the source directory, this
  // enables easy source dir configuration without having to specify the path for
  // all downstream source paths
  const context = paths.context || fs.realpathSync(process.cwd())
  const appPublic = paths.appPublic || join(context, 'public')
  let appSrc = paths.appSrc || join(context, 'src')
  let outputPath = paths.outputPath || join(context, 'dist')
  let chunkHash = mode === 'production' ? '.[chunkhash]' : ''

  // Default app src for electron projects is nested by process type
  if (electron) {
    appSrc = join(context, 'src/renderer')
    outputPath = join(context, 'src/build')
    chunkHash = ''
  }

  // Default project configs used when not specified by consumer, see README for
  // details on values and usage
  // ⚠️ If you change these ensure that the docs in README are updated!
  const defaults = {
    appEntry: join(appSrc, 'index.js'),
    appPublic,
    appSrc,
    babelLoaderInclude: [appSrc],
    context,
    copy: [appPublic],
    htmlTemplate: join(appSrc, 'index.html'),
    iconsSpriteLoaderInclude: [join(appSrc, 'media/icons')],
    outputFilename: `static/js/[name]${chunkHash}.js`,
    outputPath,
    publicPath: '/',
    sassIncludePaths: [join(appSrc, '/styles')],
  }

  // Overwrite the default path configs with any custom paths, pass through the
  // env and devServer values
  return { mode, electron, chunkHash, ...defaults, ...paths, devServer }
}
