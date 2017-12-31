/* eslint-env node */
const { resolve } = require('path')
// ⚠️ In the container the webpack source files are referenced in project, not as
// the @inspirescript/webpack-configs package
// const webpackConfigs = require('@inspirescript/webpack-configs')
const webpackConfigs = require('./index')

/**
 * Webpack accepts an object or a function as the module export for the config file.
 * The `@inspire-script/webpack-configs` module returns a base Webpack configuration
 * object. Although the base config will cover most requirements, it's very easy to
 * extend the configuration for custom requirements. Make any changes you need to
 * the returned config object, including adding to or rewriting the base configs.
 * See [Webpack Configurations](guides/Webpack.md) for details.
 * @param {boolean} env Build environment
 * @return {Object} Complete webpack configuration
 */
module.exports = env => {
  const config = webpackConfigs({
    env,
    paths: {
      // Explicitly set the context for resolving entry points and loaders
      context: resolve(__dirname),
      // See guides/tools/webpack.md for available path configurations
    },
  })

  // Default aliases for easy importing of common modules
  config.resolve.alias.UNIVERSAL = resolve('src', 'components', 'universal')
  config.resolve.alias.GUIDES = resolve('guides')

  /*
   * Make any changes to the base webpack configs for your application, eg:
   *
   * config.module.rules.push({ custom loader... })
   */

  return config
}
