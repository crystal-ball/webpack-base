# Magic Markdown

_System technical notes_

## Component registry

Because JSX is just syntactic sugar that is transpiled to JS, JSX component
expressions must refer to the component values (either a function or class). The
component registry is used to lookup the component values required for JSX
transpilation.

#### Process

1. All components that can be used in Magic Markdown content must be saved with
   a `*.registry.js(x)` file extension.
1. A singleton application registry is created in `registry.js`.
1. The registry uses webpack's `require.context` to dynamically search the
   project for any component with the registry file extension.
1. Registry components are imported and registered in the registry.
1. InspireScript App component sets the registry in context where it can be
   accessed by any child component.
1. The component wrapper for each Magic Markdown file looks up and injects
   values for any component used from the registry.

## webpack Loader

A webpack loader is used to parse the mixed JSX+Markdown content into valid JSX.
The valid JSX is then wrapped in a component class that is passed to a Babel
loader for transpilation to valid JS.

#### Process

1. The `magic-markdown` loader enables importing `.md` files into your project
   JS.
1. The loader extracts front matter and the body from the markdown source.
1. The body is parsed and rendered as HTML by `markdown-it`, this transforms the
   content to valid JSX.
1. The parsed JSX wrapped with a React component class that also sets content
   front matter in state and sets registry references.
1. The defined component is passed to the `babel-loader` which transpiles the
   JSX into executable JS.

## Resources

* [Dependency Management][] documents how webpack handles `require` expressions
  and the `require.context` functionality.
* [Module Methods][] documents the available module methods in webpack,
  including `require.context`.

<!-- Links -->

[dependency management]: https://webpack.js.org/guides/dependency-management/
[module methods]: https://webpack.js.org/api/module-methods/#require-context
