/* eslint-disable no-param-reassign */
const merge = require('webpack-merge')

const decorateOptions = require('./decorate-options')
const common = require('./common')
const electron = require('./electron')
const development = require('./development')
const production = require('./production')

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
  // Ensure that Babel has the correct environment variable for .babelrc
  process.env.BABEL_ENV = process.env.BABEL_ENV || options.mode

  // --- Generate config components
  const decoratedOptions = decorateOptions(options)
  const loaders = generateLoaders(decoratedOptions)
  const plugins = generatePlugins(decoratedOptions)

  // Merge common configs with dev vs prod specific configs to return complete
  // webpack configuration object
  let configs = common(decoratedOptions)

  if (decoratedOptions.electron) configs = merge(configs, electron())

  if (decoratedOptions.isProduction) {
    configs = merge(configs, production(decoratedOptions))
  } else {
    configs = merge(configs, development(decoratedOptions))
  }

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
