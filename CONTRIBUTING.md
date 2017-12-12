# Contributing

### Contributions are welcome at any level 😃

Thank you for contributing to the repository. Please follow the guidelines below
when contributing.

* Commit messages should be generated through `commitizen`. The repository is
  commitizen friendly if you have it installed globally, otherwise use the package
  `commit` script to generate your commit messages: `npm run commit`. This allows us
  automatically release and generate a Changelog using `semanitc-release`
* JS must pass ESLint standards. Note that formatting is included in the standards
  ands uses Prettier to determine the 'correct' format. If you do not have Prettier
  integrated in your editor you can run the package `format` script:
  `npm run format` to format all JS files in the `/src` directory.
* All tests must pass before any commit will be merged.
* Code should include inline documentation on **why** the code does what it does
  _(it should be obvious **what** the code does from semantically named functions
  and variables 😉)_. If you're unsure of whether some code should have
  documentation, error on the side of over documenting.
