const Prism = require('prismjs')
// Prism will attach required modules through some globals majic spells
require('prismjs/components/prism-jsx')
require('prismjs/components/prism-markdown')
require('prismjs/components/prism-bash')
require('prismjs/components/prism-diff')
require('prismjs/components/prism-json')
require('prismjs/components/prism-scss')
require('prismjs/components/prism-css')

// Magic Markdown custom parsing rules
const jsxBlock = require('./rules/jsx-block')
const jsxInline = require('./rules/jsx-inline')

// 1. Create Magic Markdown parser instance
// ---------------------------------------------------------------------------

/**
 * The Markdown-it instance that will parse our Magic Markdown to valid JSX.
 */
const markdownIt = require('markdown-it')({
  // Enable HTML tags in source
  html: true,
  // Linkify will convert content like 'github.com' to a fully qualified anchor
  linkify: true,
  // 🔧 TODO: Typographer replacements are not run inside JSX blocks. This is good
  // because Babel does not know how to handle the pretty quotes, but it's also bad
  // because it results in inconsistent typography. Find a way to beautify only the
  // content inside JSX blocks
  typographer: false,
  // Configuration used by markdown-it for syntax highlighting code blocks
  highlight(str, lang) {
    try {
      // ℹ️ Use dangerouslySetInnerHTML with a template string wrapping the syntax
      // highlighted output to preserve whitespace. The template string will NOT be
      // parsed as JSX
      return `<pre className="language-${lang}"><code className="language-${lang}" dangerouslySetInnerHTML={{__html: \`${Prism.highlight(
        str,
        Prism.languages[lang],
      )}\`}} /></pre>`
    } catch (ex) {
      if (!lang || !Prism.languages[lang]) {
        console.warn(`Prism: ${lang} not found`)
      } else {
        console.warn('Prism: Failed parsing language: ', ex.message)
      }
      return ''
    }
  },
})

// 2. Attach custom rules needed for parsing Magic Markdown
// ---------------------------------------------------------------------------

// ℹ️ Table is the first rule, insert custom rules first for priority
// React component rule handles JSX syntaxes that Markdown-it does not properly
// parse as block tokens
markdownIt.block.ruler.before('table', 'jsx_block', jsxBlock)
// ℹ️ Insert before html rule to intercept JSX components
markdownIt.inline.ruler.before('html_inline', 'jsx_inline', jsxInline)

// 3. Return fully assembled paser for Magic Markdown 🎉
// ---------------------------------------------------------------------------

/**
 * The parser is responsible for parsing the Magic Mardkown content into valid JSX.
 * Essentially we are trying to parse any markdown to HTML while ignoring all JSX.
 */
module.exports = body => {
  // HTML comments are NOT valid JSX, strip them out first
  const cleanedBody = body.replace(/<!--((.|\s)*?)-->/g, '')
  return markdownIt.render(cleanedBody)
}
