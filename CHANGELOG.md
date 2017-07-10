# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.1] - 2017-07-09
### Changed
- Disable `eslint-loader` until https://github.com/babel/babel-eslint/issues/487
  is resolved. Currently class statics are throwing no-undef errors 😔

## [2.0.0] - 2017-07-09
v2 Configs bump to Webpack 3! Enhancements include explicitly setting prod
optimizations to include uglify with Babili and scope hoisting.

Overall flow of module has been cleaned up and does a better job of separating
common, development and production configurations.
