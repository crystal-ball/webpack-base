# 🔮 InspireScript Magic Markdown

The Inspirescript Magic Markdown parsing is the bee's knees!

## Design

Magic Markdown is accomplished with two features, a component registry and a
webpack loader.

### Component registry

The component registry makes it possible to use React components inside your
markdown content.

1. The registry is created in `registry.js`
1. All components that can be used in Magic Markdown are saved as
   `*.registry.js(x)`
1. The registry uses `require.context` to dynamically search the project for any
   component with the registry file extension.
1. All Magic Markdown components are imported and registered in the registry
1. The registry is set in React's context where it can be accessed from any
   child component.
1. Components used inside Magic Markdown are looked up on the registry.

### webpack Loader

1. The InspireScript `magic-markdown` loader enables importing `.md` files into
   your project JS.
1. The loader extracts front matter and the body from the markdown source
1. The body is parsed and rendered as HTML by `markdown-it` and then wrapped
   with a React component class.
1. Front matter is set as state in the created component and any component used
   in the content is destructured from the Registry.
1. The defined component source is passed to the `babel-loader` where the JSX is
   transpiled to executable JS.

## Resources

* [Dependency Management][] documents how webpack handles `require` expressions
  and the `require.context` functionality.
* [Module Methods][] documents the available module methods in webpack,
  including `require.context`.

<!-- Links -->

[dependency management]: https://webpack.js.org/guides/dependency-management/
[module methods]: https://webpack.js.org/api/module-methods/#require-context
