# Application Styling
Motivation for application styling system is to provide as simple a process as
possible while maintaining consistent styles across a potentially large number of
inputs.

This is accomplished by using Bootstrap as the base style ruleset, with Componentry
components and an emphasis on utility classes.

## Bootstrap v4
Bootstrap v4 is the preferred style base ruleset because it is both modular and
comprehensive. One of the great difficulties of CSS is shared styles and we think
Bootstrap does a good job of scoping styles to specific elements.

Bootstrap v4 also provides an extensive set of customization variables that allow
an application to be fully customized while still providing a consistent theme with
minimal time investment.

## Conventions

#### Customization through variables and utility classes
When customizing appearance use Bootstrap variables and utility classes wherever
possible. This helps maximize theme consistency and makes updating/customizing the
theme later simpler.

#### Local scope component styles
When writing custom component styles, use the local syntax to ensure that the rules
are scoped to the component instance.

```scss
// rad-component.scss
:local(.component) {
  .title {
    text-transform: uppercase;
  }
}
```
```javascript
// RadComponent.jsx
import { component } from './rad-component.scss'

export () => (
  <div className={compoent}><span className="title">Custom Title</span></div>
)
```

_It is conventional to use `.component` as the locally scoped class name to provide
a consistent import variable. This makes using CSS modules slightly more
streamlined. Having a single, standard import removes cognitive overhead for modular
CSS for components_

#### Theme variables
Declare theme variables in `src/styles/theme.scss`. The theme variables can be
imported in any stylesheet directly:

```scss
@import 'theme';
```

_This is setup as a `includePath` in the webpack configurations._

## General Notes
#### `~` resolving
`~`: Webpack loaders with special resolvers use the tilde to signify that a relative
import is a node module. If you want to import a SASS file from node modules prepend
the path with a tilde:

`@import '~bootstrap/dist/bootstrap`

_See [SASS Loader][] for details_

#### Webpack configuration
The webpack loaders/plugins handle:
- Include paths configured for `src/styles`
- Autoprefixing styles
- File extraction for styles
- File hash naming

<!-- Links -->
[SASS Loader]: https://github.com/webpack-contrib/sass-loader#imports
