/**
 * Handles injecting a block token into the current parser state.
 */
module.exports = function addToken(state, startLine, endLine) {
  // Args: token type, html tag, ???
  const token = state.push('html_block', '', 0)
  token.map = [startLine, endLine + 1]
  token.content = state.getLines(startLine, endLine + 1, state.blkIndent, true)
}
