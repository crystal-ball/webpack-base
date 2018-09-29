class MiniCSSExtractPlugin {
  constructor(opts) {
    this.options = { chunkFilename: opts.filename, ...opts }
  }
}

MiniCSSExtractPlugin.loader = '/test/path/to/mini-css-extract-loader'

module.exports = MiniCSSExtractPlugin
