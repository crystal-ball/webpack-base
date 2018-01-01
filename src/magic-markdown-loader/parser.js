const Prism = require('prismjs')
// Prism will attach required modules through some globals majic spells
require('prismjs/components/prism-jsx')
require('prismjs/components/prism-markdown')
require('prismjs/components/prism-bash')
require('prismjs/components/prism-diff')
require('prismjs/components/prism-json')
require('prismjs/components/prism-scss')
require('prismjs/components/prism-css')

const renderer = require('markdown-it')({
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

module.exports = body => {
  const html = renderer.render(body) // parse md body to html
  const safeHTML = html.replace(/<!--.+-->/g, '') // Babel HATES html comments

  return safeHTML
}
