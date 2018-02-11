/* eslint-disable no-param-reassign */
const addToken = require('./add-block-token')

/**
 * This rule parses JSX block tokens from the markdown document. In order to qualify
 * as a block token, a Component must meet the following requirements:
 *
 * 1. Component definition must being without indentation
 * 2. Component close must end with either `</COMPONENT>` or `/>` with no
 *    indentation
 * 3. There cannot be content after the component close or it is an inline token.
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
  const { bMarks, eMarks, src } = state
  const pos = bMarks[startLine]
  let lineContent = src.slice(bMarks[startLine], eMarks[startLine] + 1)

  // Check for starting <
  if (src.charCodeAt(pos) !== 0x3c /* < */) return false

  // Quick fail on second char if not a capital character
  const secondChar = src.charCodeAt(pos + 1)
  if (secondChar > 0x7a || secondChar < 0x41) return false

  // Check if the line starts with a React component using a regex
  // TODO: 📝 Include component names with periods, <Card.Body>
  const componentNameMatch = lineContent.match(/^<([A-Z][a-zA-z.]*)/)

  // 👋 If there wasn't a component match, bail
  if (!componentNameMatch) return false

  const componentName = componentNameMatch[1]
  let currentLine = startLine
  let tokenEndLine

  // ========================================================
  // Test for single line block token
  // ========================================================

  const singleLineBlock = lineContent.match(
    new RegExp(`((/>)|(</${componentName}>))(.*)?\n?$`)
  )

  if (singleLineBlock) {
    // If the end match has content after the close, it's an inline token, bail out
    if (singleLineBlock[4]) return false

    addToken(state, startLine, startLine)
    state.line = startLine + 1 // Increment state to move parser forward!
    return true // Advance parser to new state.line
  }

  // ========================================================
  // Test for multi line block token
  // ========================================================

  // Start looping through lines to find the end of the token
  while (!tokenEndLine) {
    lineContent = src.slice(bMarks[currentLine], eMarks[currentLine] + 1)

    const endMatch = lineContent.match(
      new RegExp(`^((\\/>)|(<\\/${componentName}>))(.*)?\n?$`)
    )

    if (!endMatch) {
      // If this isn't the end line, keep on moving
      currentLine += 1
    } else if (endMatch[4]) {
      // If there is content on the same line as the component ends it's not a JSX
      // block token (probably a p tag) 👋
      return false
    } else {
      // If there isn't content on this end line, we found the end of a block token
      tokenEndLine = currentLine
    }

    // If we end up going over the endLine, it's bad news 👋
    if (currentLine >= endLine) break
  }

  if (tokenEndLine) {
    addToken(state, startLine, tokenEndLine)
    state.line = tokenEndLine + 1 // Increment state to move parser forward!
    return true // Advance parser to new state.line
  }

  // We're in a scenario we don't need to worry about ¯\_(ツ)_/¯
  return false
}
