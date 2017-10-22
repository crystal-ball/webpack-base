# Application React Conventions

## Component Declaration
Prefer stateless functional components wherever possible. This helps enforce
separation between the presentation and data layers.

#### Prop Types Definitions
Prefer defining prop types with Flow.

#### Syntax Convention
```javascript
type Props = { /* ... */ }

export default ({}: Props) => <div />
```

_The default Babel configs include the `transform-react-stateless-component-name`
package that will add a display name to SFCs for better debugging._
