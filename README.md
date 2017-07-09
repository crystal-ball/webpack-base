# InspireScript Webpack Configs

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
  appDist: 'dist',
  appHtml: 'public/index.html',
  appIndexJs: 'src/index.js',
  appPackageJson: 'package.json',
  appPublic: 'public',
  appSrc: 'src',
  babelLoaderInclude: 'src',
  nodeModules: 'node_modules',
  yarnLockFile: 'yarn.lock',
}
```

Custom paths can be passed as the second argument to configs call:

```javascript
'use strict';
const configs = require('@inspire-script/webpack-configs');

// Override appIndexJs to use src/main.js instead of src/index.js
module.exports = configs(env, { appIndexJs: resolveApp('src/main.js'), });
```

## BABEL_ENV
Package will set `BABEL_ENV` to match environment as a convenience.
