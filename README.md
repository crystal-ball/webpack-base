# InspireScript Webpack Configs

Base configurations for InspireScript Webpack build. Exported function`configs`
expects an environment variable and returns base config object for webpack build.

## Usage:

```javascript
'use strict';
const configs = require('@inspire-script/webpack-configs');

module.exports = configs(env);
```

An environment variable can be declared in the webpack build script:
```bash
webpack -p --env=production
```

If an environment is not provided, package defaults to `development`.

## Default Paths
Package expects the following default paths:

```javascript
{
  appDist: 'dist',
  appPublic: 'public',
  appHtml: 'public/index.html',
  appIndexJs: 'src/index.js',
  appPackageJson: 'package.json',
  appSrc: 'src',
  yarnLockFile: 'yarn.lock',
  appNodeModules: 'node_modules',
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


## Notes:
- not including babel-polyfill as entry before hot loader...
- bable-polyfill vs babel-babel-plugin-transform-runtime
- https://medium.com/@jcse/clearing-up-the-babel-6-ecosystem-c7678a314bf3
