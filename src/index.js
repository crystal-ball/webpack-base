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
 */
module.exports = function webpackBase(options = {}) {
  const decoratedOptions = decorateOptions(options)
  const loaders = generateLoaders(decoratedOptions)
  const plugins = generatePlugins(decoratedOptions)

  const { development, production, electron } = decoratedOptions.flags

  // 1. Generate common configs
  // Merge common configs with dev vs prod specific configs to return complete
  // webpack configuration object
  let configs = commonConfigs(decoratedOptions)

  // 2. Merge target specific configs
  if (electron) configs = merge(configs, electronConfigs())
  if (production) configs = merge(configs, productionConfigs(decoratedOptions))
  if (development) configs = merge(configs, developmentConfigs(decoratedOptions))

  // 3. Map loader and plugin names to instances with options
  configs.module.rules = configs.module.rules
    .filter(loader => options[loader] !== false)
    .map(loader => {
      if (typeof options[loader] === 'function') return options[loader](loaders[loader]())
      return loaders[loader](options[loader])
    })

  configs.plugins = configs.plugins
    .filter(plugin => options[plugin] !== false)
    .map(plugin => plugins[plugin])

  return { configs, loaders, plugins }
}
