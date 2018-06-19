# Contributing

### Contributions are welcome at any level 😃

Thank you for contributing to the repository. Please follow the guidelines below
when contributing.

- **Forking** - Begin by forking the repo and creating a branch off of
  `develop`. The git flow branching conventions should be followed. PRs should
  be submitted against `develop`.
- **Commit Messages** - Commit messages should be generated through
  [`commitizen`][commitizen]. The repository is commitizen friendly if you have
  it installed globally, otherwise use the package `commit` script to generate
  your commit messages: `npm run commit`. This allows us automatically release
  and generate a Changelog using `semanitc-release`
- **Formatting + Linting** - JS must pass ESLint standards. Note that formatting
  is included in the standards ands uses Prettier to determine the 'correct'
  format. If you do not have Prettier integrated in your editor you can run the
  package `format` script: `npm run format` to format all JS files in the `/src`
  directory.
- **Tests** - All tests must pass before any commit will be merged. Run the test
  script to validate tests are passing: `npm test`
- **Documentation** - Code should include inline documentation on **why** the
  code does what it does _(it should be obvious **what** the code does from
  semantically named functions and variables 😉)_. If you're unsure of whether
  some code should have documentation, error on the side of over documenting.

## Development

This module exports a function that creates a base webpack config and includes
any required node modules for running a webpack build. The intent is to make
running a build simple, but allow for any customization required.

1.  `npm install` to install the dependencies for this module
1.  `node ./scripts/generate-test-project TEST` to generate a test project
1.  `cd TEST && npm install` to change directories and install application
    dependencies for InspireScript.
1.  `npm start` or `npm run build` to validate required modules and webpack
    configs are working.

### Files

- `/src` contains the webpack config generators
- `/test-app` contains the template for new projects

<!-- Links -->

[commitizen]: https://github.com/commitizen/cz-cli
