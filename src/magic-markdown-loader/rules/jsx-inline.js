/* eslint-disable no-param-reassign */

/**
 * Handles injecting an inline token into the current parser state.
 */
function addToken(state, startLine, endLine) {
  const token = state.push('html_inline', '', 0)
  token.content = state.src.slice(startLine, endLine)
}

/**
 * The markdown-it inline html rules do not match on React components, so we match
 * and insert tokens for them with the inline-jsx rule.
 *
 * Rule intended flow:
 *
 * 1. Quick validations to determine if an inline JSX component is being evaluated.
 *    (If not rule exits)
 *    1. If the component is self-closing return token using match length
 *    1. If the component is a block component, find the index of the closing tag
 *       for the component.
 * @param {object} state
 * @param {number} state.pos Current index of string starting evaluation of possible
 * inline token.
 * @param {number} state.posMax Length of source string
 * @param {string} state.src The original content source string of the block token
 * being evaluated for inline tokens.
 */
module.exports = function jsxInline(state, silent) {
  const { pos, posMax, src } = state
  let endPos

  // Check for starting <
  if (state.src.charCodeAt(pos) !== 0x3c /* < */ || pos + 2 >= posMax) {
    return false
  }

  // Quick fail on second char if not a capital character
  if (state.src.charCodeAt(pos + 1) < 65 || state.src.charCodeAt(pos + 1) > 90) {
    return false
  }

  const content = src.slice(pos)

  // ========================================================
  // Test for self closing component
  // ========================================================
  // This tests for a React component open, then uses a lazy question mark to
  // prevent steamrolling the closing />, we can then check if group 1 matched to
  // know if this is a self-closing component. It's not the most performant check,
  // but it's simple and clean.
  const selfClosing = content.match(/^<[A-Z].*?(\/)?>/)

  if (selfClosing && selfClosing[1]) {
    endPos = pos + selfClosing[0].length

    if (!silent) addToken(state, pos, endPos)
    state.pos = endPos
    return true
  }

  // ========================================================
  // Test for block component
  // ========================================================
  // Match the component name and use it to find the closing tag of the block
  // component expression.
  const componentName = content.match(/^<([A-Z][a-zA-z]*)/)
  if (!componentName) return false // Just in case ¯\_(ツ)_/¯

  // ℹ️ This does NOT match the _final_ closing tag for nested components, BUT
  // markdown-it does not escape closing tags, and so this seems to be a neat
  // 'trick' that successfully passes through block components unaltered (even
  // though the tokens are not correct)
  const endMatch = content.match(new RegExp(`<\\/${componentName[1]}>`))
  endPos = pos + endMatch.index + componentName[1].length + 3

  if (!silent) addToken(state, pos, endPos)
  state.pos = endPos
  return true
}
