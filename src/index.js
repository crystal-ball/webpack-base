/* eslint-disable no-param-reassign */
const merge = require('webpack-merge')

const decorateOptions = require('./decorate-options')
const commonConfigs = require('./common-configs')
const electronConfigs = require('./electron-configs')
const developmentConfigs = require('./development-configs')
const productionConfigs = require('./production-configs')

const generateLoaders = require('./generate-loaders')
const generatePlugins = require('./generate-plugins')

/**
 * Crystal ball projects' base webpack configs include configurations for loader
 * definitions, dev server, build indicators, stats, etc. The configurations are
 * specific to environment and can be overriden as needed for custom build
 * requirements.
 * @param {Object} options
 * @param {Object} options.paths
 * @param {Object} options.serve
 * @returns {Object} Base Webpack configurations object.
 */
module.exports = function webpackBase(options = {}) {
  const decoratedOptions = decorateOptions(options)
  const loaders = generateLoaders(decoratedOptions)
  const plugins = generatePlugins(decoratedOptions)

  // process.env.BABEL_ENV = process.env.BABEL_ENV || decoratedOptions.flags.mode

  // Merge common configs with dev vs prod specific configs to return complete
  // webpack configuration object
  let configs = commonConfigs(decoratedOptions)

  const { development, electron, production } = decoratedOptions.flags
  if (electron) configs = merge(configs, electronConfigs())
  if (production) configs = merge(configs, productionConfigs(decoratedOptions))
  if (development) configs = merge(configs, developmentConfigs(decoratedOptions))

  // Map loader and plugin names to instances
  configs.module.rules = configs.module.rules.map(loader => loaders[loader])
  configs.plugins = configs.plugins.map(plugin => plugins[plugin])

  return configs
}

module.exports.components = function components(options = {}) {
  const decoratedOptions = decorateOptions(options)
  const loaders = generateLoaders(decoratedOptions)
  const plugins = generatePlugins(decoratedOptions)

  return { loaders, plugins }
}
