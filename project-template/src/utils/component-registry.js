import * as Componentry from 'componentry'
import { Link } from 'react-router-dom'

/**
 * The component registry is mounted in context and accessed by the `MagicMarkdown`
 * components. Any component used in the content is destructured off the registry,
 * this is how components are transpiled without having to import them specifically
 * into the generated components.
 *
 * All components from Componentry and the Link component are included as a base set
 * of components to work with.
 */
const componentRegistry = {
  Link,
}

Object.keys(Componentry).forEach(component => {
  componentRegistry[component] = Componentry[component]
})

export default componentRegistry
