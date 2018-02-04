/* eslint-disable no-param-reassign */

/**
 * Tests the passed line content for a component close character. If found, returns
 * component type of `'inline'` or `'block'`
 */
function findComponentEnd(lineContent) {
  const match = lineContent.match(/(\/)>/)

  // The component doesn't end on this line
  if (!match) return false

  // The component ends on this line, check for a match in group 1 to know if it's
  // an inline or block component
  return match[1] ? 'inline' : 'block'
}

/**
 * Handles injecting a block token into the current parser state.
 */
function addToken(state, startLine, endLine) {
  // Args: token type, html tag, ???
  const token = state.push('html_block', '', 0)
  token.map = [startLine, endLine + 1]
  token.content = state.getLines(startLine, endLine + 1, state.blkIndent, true)
}

/**
 * The markdown-it parser doesn't parse all JSX component forms as HTML blocks, and
 * when it doesn't match it will assume the component is a block paragraph and wrap
 * it in a `<p>` tag. This set or rules does **NOT** attempt to match all JSX
 * component instances, instead it looks for instances that we know markdown-it
 * mangles. This was the quickest way to get what appears to be full parity quickly,
 * if more failure cases are found, we should evaulate if it would be worthwhile to
 * switch to attempting to match ALL JSX component instances.
 *
 * Rule intended flow:
 *
 * 1. IF a line starts with `<[A-Z]`, then it is a markdown block token with a JSX
 *    component for content. (If not rule exits)
 *    1. IF the component is a single line block component, manually inject a token
 *    1. IF the component is a multiline self closing component, manually inject a
 *       token
 *
 * ℹ️ Single line self closing components and mutliline block components appear to
 * be correctly recognized as block tokens, so we ignore them.
 * ℹ️ The `block` and `self-closing` langauge used here refers to JSX component
 * syntax, not markdown block/inline parsing.
 * @param {object} state
 * @param {string} state.src The original source string
 * @param {array} state.bMarks The string index in src for each line start
 * @param {array} state.eMarks The string index in src for each line end
 * @param {array} state.tShift The indentation level of each line
 * @param {number} state.line The current line
 * @param {number} state.lineMax The total number of lines
 * @param {array} state.tokens Array of tokens parsed so far
 * @param {*} startLine The current line of the parser
 * @param {*} endLine The max line of the content
 * @param {*} silent https://github.com/markdown-it/markdown-it/issues/323 ???
 */
module.exports = (state, startLine, endLine /* , silent */) => {
  const { bMarks, eMarks } = state
  const lineContent = state.src.slice(bMarks[startLine], eMarks[startLine] + 1)

  // Check if the line starts with a React component using a regex
  // TODO: 📝 Include component names with periods, <Card.Body>
  const componentMatch = lineContent.match(/^<([A-Z][a-zA-z]*)/)

  // 👋 If there wasn't a component match, bail
  if (!componentMatch) return false

  // ========================================================
  // Test for single line block component
  // ========================================================
  const singleLineBlock = lineContent.match(
    new RegExp(`<\\/${componentMatch[1]}>\n$`),
  )

  if (singleLineBlock) {
    addToken(state, startLine, startLine)
    state.line = startLine + 1 // Increment state to move parser forward!
    return true // Advance parser to new state.line
  }

  // ========================================================
  // Test for self-closing component
  // ========================================================
  if (!lineContent.includes('>')) {
    let componentEndLine
    // Start testing subsequent lines to find where the component ends. If the
    // component is a block form, we can leave it, if it's self closing, we need to
    // add a block token for it b/c markdown-it wraps in a <p>
    let currentLine = startLine + 1

    while (currentLine < endLine) {
      const endMatch = findComponentEnd(
        state.src.slice(bMarks[currentLine], eMarks[currentLine] + 1),
      )

      if (endMatch === 'inline') {
        componentEndLine = currentLine
        break
      }

      currentLine += 1
    }

    if (componentEndLine) {
      addToken(state, startLine, componentEndLine)
      state.line = componentEndLine + 1 // Increment state to move parser forward!
      return true // Advance parser to new state.line
    }
  }

  // We're in a scenario we don't need to worry about ¯\_(ツ)_/¯
  return false
}
