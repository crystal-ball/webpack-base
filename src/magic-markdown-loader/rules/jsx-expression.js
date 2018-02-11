/* eslint-disable no-param-reassign */
const addToken = require('./add-block-token')

module.exports = (state, startLine, endLine /* , silent */) => {
  const { bMarks, eMarks, src } = state
  const pos = bMarks[startLine]
  let lineContent = src.slice(bMarks[startLine], eMarks[startLine] + 1)

  // Check for starting {
  if (src.charCodeAt(pos) !== 0x7b /* { */) return false

  let currentLine = startLine
  let tokenEndLine

  // ========================================================
  // Test for single line block token
  // ========================================================

  const singleLineBlock = lineContent.match(new RegExp(`(}+)(.*)?\n?$`))

  if (singleLineBlock) {
    // If the end match has content after the close, it's an inline token, bail out
    if (singleLineBlock[2]) return false

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

    const endMatch = lineContent.match(new RegExp(`^[)}]+(.*)?\n?$`))

    if (!endMatch) {
      // If this isn't the end line, keep on moving
      currentLine += 1
    } else if (endMatch[1]) {
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
