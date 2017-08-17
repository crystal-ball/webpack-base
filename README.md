# InspireScript Webpack Configs
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Base configurations for InspireScript Webpack build. Exported function`configs`
expects an environment variable and returns base config object for webpack build.

## Usage:

```javascript
'use strict';
const configs = require('@inspire-script/webpack-configs');

module.exports = configs(env, { paths: 'path overrides' });
```

An environment variable should be declared in the webpack build script:
```bash
webpack --env=production --progress --profile --colors
```

## Default Paths
Package uses the following default paths:

```javascript
{
  appIndexJs: '/src/index.js',
  appPackageJson: '/package.json',
  appPublic: '/public',
  appSrc: '/src',
  babelLoaderInclude: '/src',
  htmlTemplate: '/public/index.html',
  nodeModules: '/node_modules',
  outputPath: '/build',
  publicPath: '/',
  yarnLockFile: '/yarn.lock',
}
```

Custom paths can be passed as the second argument to configs call:

```javascript
'use strict';
const configs = require('@inspire-script/webpack-configs');

// Override appIndexJs to use src/main.js instead of src/index.js
module.exports = configs(env, { appIndexJs: resolveApp('src/main.js'), });
```

## Styles
The configurations are intended for using Sass with the following patterns:
- Allow easy import of a base set of library styles from Node modules using the
  `~library/path/to/styles` syntax.
- Allow `.scss` files to be required into component files. Using the `.scss`
  extension is required.
- Allow component level namespacing of styles using a single top level local style
  class. The class `.component` is the standard class name to use for any component
  styles. This makes importing the localized class name into a component file
  consistent:
  ```scss
  // style.scss
  :local(.component) {
    .title {}
    .feature {}
    // etc..
  }
  ```
  ```javascript
  // component.jsx
  import { component } from './style.scss';
  // Importing component is standard and requires only a single import
  ```
  Having a single, standard import removes cognitive overhead for modular CSS for
  components.

## BABEL_ENV
Package will set `BABEL_ENV` to match environment as a convenience.
