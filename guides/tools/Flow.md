# Static Typing with Flow

## Motivation

Static typing with Flow provides feedback on typing bugs with minimal overhead.

## Usage

Flow configuration and tooling is automatically setup when creating a project.
ESLint is able to parse Flow typings and will still correctly detect if
component props are typed. Flow is configured as opt-in, and can be activated in
any file by adding the Flow flag as the **first line** to any file:

```javascript
// @flow
import React from 'react'
/* ... */
```

#### Disabling

You can disable Flow for any line using either of the suppression comments:

* `// $FlowFixMe: ...` for type TODOs that you aren't ready for yet
* `// $FlowIgnore: ...` for issues with Flow type checking itself

```javascript
// $FlowIgnore: Flow doesn't know about webpack magic comments for dynamic imports
import(/* webpackMode: "eager", webpackChunkName: "icons" */ `media/icons/${
  props.id
}.svg`)
```

#### Error Checking

Use Flow to check your code for errors with the npm script:

```shell
npm run flow
```

## Flow Typed

Add type definitions for third party library interfaces using the
[`flow-typed`][flow-typed] package.

```shell
# Install flow-typed globally
npm i -g flow-typed

# Add type definition for a library, eg `react-router-dom`
flow-typed install react-router-dom@^4.2

# Update type definitions for a library
flow-typed update react-router-dom@^4.2

# Create a stub for a library with type definitions
flow-typed create-stub redux-saga@0.15.6
```

_See [Importing And Using Type Definitions][importing types] for details._

## Editor Setup

#### VSCode

* Install the [Flow Language Support][] extension. Recommended config updates
  include:

```javascript
{
  // Disable validating JS to allow using types in .js files
  "javascript.validate.enable": false,
  // Prefer project specific `flow-bin` package to global installation
  "flow.useNPMPackagedFlow": true
}
```

## Setup Reference

#### Dependencies

* `flow-bin` package
* `.flowconfig` configuration file
* `__mock__/css-modules.flow.js` mock type definition
* `flow-typed/npm/*` definition files

#### ESLint Integration

The `eslint-plugin-flowtype` adds support for parsing Flow type annotations to
ESLint. Default ESLint rule configurations are included to instruct ESLint what
to do with type annotation declarations, but do not do not include further rules
for types linting (see TODOs). ESLint is smart enough to recognize when prop
types are defined using Flow types without explicit configuration.

#### webpack Integration

Additional configuration is required to instruct Flow how to handle the webpack
module resolution/aliasing and non JS imports.

* Module resolution/aliasing is specified by including
  `module.system.node.resolve_dirname` values in `.flowconfig`.
* Non JS imports are configured using mock type definitions specified in
  `__mock__` and specified by including `module.name_mapper.extension` values in
  `.flowconfig`

## Resources

* [Official Docs][] for guides on type annotations
* [`flow-typed][flow-typed] for installing third party definitions
* [Flow Types Cheat Sheet][types] for available types reference

## TODO

* [] ESLint rules for type annotations (see `eslint-plugin-flowtype` package)

<!-- Links -->

[importing types]: https://github.com/flowtype/flow-typed/wiki/Importing-And-Using-Type-Definitions
[flow-typed]: https://github.com/flowtype/flow-typed
[flow language support]: https://marketplace.visualstudio.com/items?itemName=flowtype.flow-for-vscode
[official docs]: https://flow.org/en/docs/
[types]: https://www.saltycrane.com/flow-type-cheat-sheet/latest/
