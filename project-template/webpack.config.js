/* eslint-env node */
const configs = require('@inspire-script/webpack-configs')

/**
 * Webpack config accepts a function that is called with an env defined in the
 * package script: `webpack --env=production`
 *
 * Note that the returned config is only a base, you can make any changes you need
 * to support your build requirements. The returned configs have the shape:
 * ```json
 * {
 *   entry: {},
 *   output: {},
 *   bail: true,
 *   devtool: '',
 *   performance: {},
 *   resolve: {},
 *   module: {
 *     rules: []
 *   },
 *   plugins: [],
 *   devServer: {}
 * }
 * ```
 * @param {boolean} env Build environment
 */
module.exports = env => {
  // Any path overrides can be passed in the call to create the base configurations
  const baseConfig = configs({ env, paths: {} })

  /*
   * Make any changes you need to returned webpack config here before returning
   */

  return baseConfig
}
