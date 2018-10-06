/**
 * Electron specific configurations
 */
module.exports = () => ({
  target: 'electron-renderer',
  output: {
    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2',
  },
})
