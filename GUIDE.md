Logo
Badges

---

## Overview
  - base configs that can be customized however needed
  - provide confguration for common application setup
  - deduplicates work of maintaining a build system
  - motivation

TOC

---

## Setup

Install dependency and then `npx 🔮` to initialize a project!

Standard project structure and conventions.

```
project
├─ /public
│  └─ favicon.ico
├─ / src
│  └─ /api
│  └─ /components
│  └─ /dux
│  └─ /lib
│  └─ /media
│  └─ /styles
│  ├─ index.html
│  └─ index.js
├─ .babelrc
└─ webpack.config.js
```

## Architecture

!Note that source code has lots of comments (and emojis) to make it easier to
understand.

Package generates a set of base configs based on preset, environment, and custom
application options. Configurations common to both environments are in `common`
and `webpack-merge` package is used to include dev vs. prod specific configs.

Base configurations are based off of standard project setup, pass custom options
for projects with custom setups.

## Configs
  - top level options
  - paths (set paths with `resolve`)
  - presets

## Build pipeline
1. Babel (JS) - transpile modern syntax to any target
1. Public copying - escape hatch for assets outside build pipeline
1. Asset path prefixing (for CDNs)
1. Production optimizations - minify, module hoisting, tree shaking, filename hashing
1. SVG icon font sprite generation
1. Environment variables injection (NODE_ENV, DEBUG, PUBLIC_PATH)
1. Bundle splitting (main, vendor, runtime)
1. Image loader for asset hashing and explicit dependency management
1. HTML asset path injection
1. Source maps generation
1. SASS compilation with class name scoping and production extraction
1. Duplicate package checking
1. Output directory cleaning

## DX features
1. Module resolution (relative resolution, named directory resolution)
1. Dev server with hot reloading
1. App opening with loading page
1. Progress bar indicator for production builds
1. File linting with eslint-loader and friendly errors in terminal

## Contributing
PLEASE DO!
Or just learn more about webpack+Babel
See repo 'Roadmap' project for places to get started

## Developing

Conceptual setup of testing (and difficulties of testing dependencies and configs
_ACTUALLY_ work together)

- Docker container
- /test-app

## Testing

- Unit tests (linting+config snapshots)
- Acceptance tests (e2e application testing of prod builds in Docker workflow)

## Misc
Node version support

<!-- Links -->
