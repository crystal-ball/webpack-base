const webpackBase = require('@crystal-ball/webpack-base')

/*
 * 📦 Single webpack configuration file handles different environment build targets
 * by using webpack-base to merge configurations common to all environments with
 * configurations unique to targeted environment.
 *
 * 📝 https://github.com/crystal-ball/webpack-base
 */
module.exports = env => {
  /*
   * Generate the base configuration object by passing the environment flags and
   * optional options object available for customizing the standard project
   * conventions.
   */
  const baseConfigs = webpackBase(env /* , {options} */)

  /*
   * Handle non-standard, advanced project customization by directly updating the
   * generated base configs.
   */
  // eg: baseConfigs.bail = false

  return baseConfigs
}
