const fs = require('fs')
const { join } = require('path')

/** Assign default values to any option not specified by consuming applicaiton */
module.exports = function generateConfigs({ mode, paths = {}, devServer = {} } = {}) {
  // Handle default resolution of build specifics off of the source directory, this
  // enables easy source dir configuration without having to specify the path for
  // all downstream source paths
  const context = paths.context || fs.realpathSync(process.cwd())
  const appSrc = paths.appSrc || join(context, 'src')

  // Default project configs used when not specified by consumer, see README for
  // details on values and usage
  // ⚠️ If you change these ensure that the docs in README are updated!
  const defaults = {
    appEntry: join(appSrc, 'index.js'),
    appPublic: join(context, 'public'),
    appSrc,
    babelLoaderInclude: [appSrc],
    context,
    htmlTemplate: join(appSrc, 'index.html'),
    iconsSpriteLoaderInclude: [join(appSrc, 'media/icons')],
    outputFilename: `static/js/[name]${mode === 'production' ? '.[chunkhash]' : ''}.js`,
    outputPath: join(context, 'dist'),
    publicPath: '/',
    sassIncludePaths: [join(appSrc, '/styles')],
  }

  // Overwrite the default path configs with any custom paths, pass through the
  // env and devServer values
  return { mode, ...defaults, ...paths, devServer }
}
