/* eslint-env node */
const { resolve } = require('path')
const createBaseConfigs = require('@inspire-script/webpack-configs')

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
  const baseConfig = createBaseConfigs({
    env,
    // Any path overrides can be passed in the path options
    paths: {
      // Explicitly set the context for resolving entry points and loaders
      context: resolve(__dirname),
    },
  })

  /*
   * Make any changes you need to the base Webpack config here, ie:
   * baseConfig.plugins.push(new AwesomePlugin())
   */

  return baseConfig
}
