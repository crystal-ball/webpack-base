/* eslint-env node */
// Magic Markdown loader is required and executed by webpack, which doesn't support
// ES modules
const { interpolateName } = require('loader-utils')
const frontMatter = require('front-matter')

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
})

/**
 * The magic markdown loader handles importing markdown files and wrapping them as
 * components for Babel transpilation.
 */
module.exports = function loader(source) {
  // For better identification, pull the filename out of the resource path and
  // transform it into a component name used in returned component source
  const id = interpolateName({ resourcePath: this.resourcePath }, '[name]', {
    content: '',
  })

  const componentName = `${id.slice(0, 1).toUpperCase()}${id
    .slice(1)
    .replace(/\s/g, '')
    .replace(/-([a-z])/g, (match, p1) => p1.toUpperCase())}`

  // ========================================================
  // Convert source markdown to HTML
  // ========================================================
  const { body = '', attributes = {} } = frontMatter(source) // extract front matter and body
  const html = renderer.render(body) // parse md body to html
  const safeHTML = html.replace(/<!--.+-->/g, '') // Babel HATES html comments

  // Create set of variable names to destructure defined attributes
  const attributeVars = Object.keys(attributes)

  // create a unique set of component names used in the markdown that can be
  // destructured off of the REGISTRY in the returned component source
  const componentNames = safeHTML.match(/<([A-Z][A-za-z]+)/g) || []
  const uniqueComponentNames = [...new Set(componentNames)].map(component =>
    component.slice(1),
  )

  // 🔮 Component source that wraps the markdown html in a component instance with
  // all of the components used in the markdown destructured off of the REGISTRY.
  // HTML is wrapped in a Fragment because it won't have a top level element. ⚠️This
  // component MUST be run through the Babel loader to transpile the JSX into
  // `createElement` calls.
  // The front matter attributes are declared a single time in the module scope and
  // the value is injected by stringifying the JSON value
  return `import React, { Fragment } from 'react'
import { object } from 'prop-types'

// Front matter attributes declared once at module level
const attributes = ${JSON.stringify(attributes)}

const ${componentName} = (props, { REGISTRY = {} }) => {
  // Destructure components used in body from REGISTRY
  let {${uniqueComponentNames.toString()}} = REGISTRY
  // Destructure front matter to local variables
  let {${attributeVars.toString()}} = attributes

  return <Fragment>${safeHTML}</Fragment>
}

${componentName}.contextTypes = {
  REGISTRY: object,
  THEME: object,
}

export default ${componentName}`
}

// It is possible to append REGISTRY. before every component name to directly lookup
// that component on the registry. Currently destructuring the component names off
// of the registry is favored for flexibility. If implementation doesn't turn up
// any issues the below should be deleted

// Append every component instance with REGISTRY. to lookup component on registry
// const registryHTML = html.replace(
//   /(<\/?)([A-Z])/g,
//   (match, p1, p2) => `${p1}REGISTRY.${p2}`,
// )
