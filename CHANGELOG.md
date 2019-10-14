# @crystal-ball/webpack-base changelog

This project strictly adheres to semver and will err on the side of releasing majors when
changes could possibly introduce breaking changes. This changelog is dynamically generated
with [Semantic Release](https://semantic-release.gitbook.io/semantic-release/) configured
with [@crystal-ball/semantic-release-base](https://github.com/crystal-ball/semantic-release-base).

> Changelog tags
>
> - 💥 - Breaking change
> - 🔖 - Release notes
> - 💖 - New feature
> - ✨ - Updates
> - 🛠 - Fixes


## [6.5.0](https://github.com/crystal-ball/webpack-base/compare/v6.4.0...v6.5.0) (2019-10-14)


#### ✨ Update

* Update minor dependencies 🆙 (#95)([bb20a9c](https://github.com/crystal-ball/webpack-base/commit/bb20a9c2da1bdcc75a65beb334833caef5e7a52d)), closes [#95](https://github.com/crystal-ball/webpack-base/issue/95)

#### Chore, Docs

* Add Github Action ⚙️ (#94)([ffe4217](https://github.com/crystal-ball/webpack-base/commit/ffe42171e60f9301f129e5d287f058fb548da238)), closes [#94](https://github.com/crystal-ball/webpack-base/issue/94)
* DevDependencies 🆙([324d2e7](https://github.com/crystal-ball/webpack-base/commit/324d2e7d1df7b052cd97c57947363b64d7d1704f))
* Reconfigure Renovate ⚙️ (#92)([f5f03a4](https://github.com/crystal-ball/webpack-base/commit/f5f03a4a0650142349bde6819c1d57d013855e7b)), closes [#92](https://github.com/crystal-ball/webpack-base/issue/92)
* Use env var to skip installing Cypress binary 🎉 (#97)([090d01a](https://github.com/crystal-ball/webpack-base/commit/090d01a39296f0d31777c76763525e608da28475)), closes [#97](https://github.com/crystal-ball/webpack-base/issue/97)
* Update Github Actions references 📝 (#96)([497639e](https://github.com/crystal-ball/webpack-base/commit/497639e5c1d35dd0e610755bda104f84a1c2a24b)), closes [#96](https://github.com/crystal-ball/webpack-base/issue/96)

## [6.4.0](https://github.com/crystal-ball/webpack-base/compare/v6.3.0...v6.4.0) (2019-10-02)


#### 💖 New

* Add favicon generator plugin ✨ (#89)([161588b](https://github.com/crystal-ball/webpack-base/commit/161588baadb646360221ad70dd0452162c420e7f)), closes [#89](https://github.com/crystal-ball/webpack-base/issue/89) [#86](https://github.com/crystal-ball/webpack-base/issue/86)

## [6.3.0](https://github.com/crystal-ball/webpack-base/compare/v6.2.0...v6.3.0) (2019-10-02)


#### 💖 New

* Minify build CSS in prod 🏎 (#88)([33ad513](https://github.com/crystal-ball/webpack-base/commit/33ad513878c1dff3a738a3cf351bd28a188f92a5)), closes [#88](https://github.com/crystal-ball/webpack-base/issue/88) [#87](https://github.com/crystal-ball/webpack-base/issue/87)

## [6.2.0](https://github.com/crystal-ball/webpack-base/compare/v6.1.0...v6.2.0) (2019-10-01)


#### ✨ Update

* Dependencies 🆙 (#85)([e9618e7](https://github.com/crystal-ball/webpack-base/commit/e9618e7de09d2c4929e97dbf5df8dd623db63c07)), closes [#85](https://github.com/crystal-ball/webpack-base/issue/85)

#### Chore

* Build master branch only ⚙️ (#82)([7061090](https://github.com/crystal-ball/webpack-base/commit/70610906e1aa53f44cfbaf122d81c398de791a9b)), closes [#82](https://github.com/crystal-ball/webpack-base/issue/82)

## [6.1.0](https://github.com/crystal-ball/webpack-base/compare/v6.0.1...v6.1.0) (2019-09-10)


#### 💖 New

* Add Storybook target 💖 (#79)([a894762](https://github.com/crystal-ball/webpack-base/commit/a894762971736c014288280fee22bea10b6770cf)), closes [#79](https://github.com/crystal-ball/webpack-base/issue/79)

#### Docs, Chore

* Header upgrade and Slack integrations 📝 (#78)([8d2ccaf](https://github.com/crystal-ball/webpack-base/commit/8d2ccaf18668c13006ec21fdbbbc2e4a06935acf)), closes [#78](https://github.com/crystal-ball/webpack-base/issue/78)
* Dont install Cypress in Travis builds (#80)([aed3552](https://github.com/crystal-ball/webpack-base/commit/aed355202c2c38695e5037f5e106bdb6beaca8ba)), closes [#80](https://github.com/crystal-ball/webpack-base/issue/80)

### [6.0.1](https://github.com/crystal-ball/webpack-base/compare/v6.0.0...v6.0.1) (2019-09-08)


#### 🛠 Fix

* Svgo configs stripping svg viewBox attr (#77)([1b8fc82](https://github.com/crystal-ball/webpack-base/commit/1b8fc82f52b094ccc9c8060b6ab17b0b4bf46adf)), closes [#77](https://github.com/crystal-ball/webpack-base/issue/77)

#### Chore

* Configure Code Climate test coverage reporting ⚙️ (#76)([aaac740](https://github.com/crystal-ball/webpack-base/commit/aaac74034b601ff6450532f91cd911fcb6ad7fea)), closes [#76](https://github.com/crystal-ball/webpack-base/issue/76)

## [6.0.0](https://github.com/crystal-ball/webpack-base/compare/v5.3.4...v6.0.0) (2019-09-07)


### 💥 Breaking Changes!

* The compression plugin has been removed (Zeit provides Brotli compression out of
box), The output directory is now `public` to match Zeit defaults, the public directory is now
`static` and the configuration path names have been cleaned up (see README for new names)


#### Release, Docs, Chore

* V6 - Zeit-tastic 🔮✨ (#75)([72f9233](https://github.com/crystal-ball/webpack-base/commit/72f92336e5089fb9bd292d59a0ea756dfa80f865)), closes [#75](https://github.com/crystal-ball/webpack-base/issue/75) [#27](https://github.com/crystal-ball/webpack-base/issue/27)
* Update package header 📝 (#72)([848dd39](https://github.com/crystal-ball/webpack-base/commit/848dd3924e36947569e6691dcf69cfb20f928dfb)), closes [#72](https://github.com/crystal-ball/webpack-base/issue/72)
* Remove test app and use prototype app 🔥 (#73)([66b8d40](https://github.com/crystal-ball/webpack-base/commit/66b8d4050bfe3b62f391b04fb9299c27c90f1941)), closes [#73](https://github.com/crystal-ball/webpack-base/issue/73)

### [5.3.4](https://github.com/crystal-ball/webpack-base/compare/v5.3.3...v5.3.4) (2019-09-03)


#### 🛠 Fix

* Postinstall script fix attempt 3 😅 (#71)([d64cd77](https://github.com/crystal-ball/webpack-base/commit/d64cd77b54c98903864127cfbfec8d7bd734c396)), closes [#71](https://github.com/crystal-ball/webpack-base/issue/71)

### [5.3.3](https://github.com/crystal-ball/webpack-base/compare/v5.3.2...v5.3.3) (2019-09-03)


#### 🛠 Fix

* Specify bash when running postinstall explicitly (#70)([8568644](https://github.com/crystal-ball/webpack-base/commit/8568644bdcc76a256d1562d440d7b1406e84a55c)), closes [#70](https://github.com/crystal-ball/webpack-base/issue/70)

### [5.3.2](https://github.com/crystal-ball/webpack-base/compare/v5.3.1...v5.3.2) (2019-09-03)


#### 🛠 Fix

* Remove styled-components plugin from project bundled dependencies 🔧 (#69)([749bbbc](https://github.com/crystal-ball/webpack-base/commit/749bbbcfd7a35f0afcb4cd772c3dd296ac498f60)), closes [#69](https://github.com/crystal-ball/webpack-base/issue/69)

### [5.3.1](https://github.com/crystal-ball/webpack-base/compare/v5.3.0...v5.3.1) (2019-09-03)


#### 🛠 Fix

* Skip postinstall hook when installed as a dependency 🔧 (#68)([807c82f](https://github.com/crystal-ball/webpack-base/commit/807c82fed16387e2e7bf081cd4ce624efbe043e5)), closes [#68](https://github.com/crystal-ball/webpack-base/issue/68)

## [5.3.0](https://github.com/crystal-ball/webpack-base/compare/v5.2.1...v5.3.0) (2019-09-02)


#### ✨ Update

* Upgrade package dependencies 🆙 (#65)([1ab4cde](https://github.com/crystal-ball/webpack-base/commit/1ab4cdea36e3ed661479419d72a0a7b27d783e5e)), closes [#65](https://github.com/crystal-ball/webpack-base/issue/65)

#### Upgrade, Chore

* Update all non-major dependencies (#58)([0b6d1c7](https://github.com/crystal-ball/webpack-base/commit/0b6d1c742da6db4688652f95956103f07479462f)), closes [#58](https://github.com/crystal-ball/webpack-base/issue/58)
* Move Cypress to a post-install script for faster CI deploys ⚙️ (#60)([f769616](https://github.com/crystal-ball/webpack-base/commit/f76961602f704274232641fd2013fb3ff9e23ea5)), closes [#60](https://github.com/crystal-ball/webpack-base/issue/60)
* Update cypress/included Docker tag to v3.4.1 (#62)([aaf59eb](https://github.com/crystal-ball/webpack-base/commit/aaf59eb585825cd087292ab19f00832292449049)), closes [#62](https://github.com/crystal-ball/webpack-base/issue/62)
* Update test-app deps 🆙 (#67)([c33fcce](https://github.com/crystal-ball/webpack-base/commit/c33fccea28fd72fda5311fc921c1c8b351d055e1)), closes [#67](https://github.com/crystal-ball/webpack-base/issue/67)

### [5.2.1](https://github.com/crystal-ball/webpack-base/compare/v5.2.0...v5.2.1) (2019-07-30)


#### 🛠 Fix

* Remove abandoned webpack-monitor dependency 🔧 (#59)([0cd165e](https://github.com/crystal-ball/webpack-base/commit/0cd165ef93b0c1aab1aa6baef6f8b3da2139a38d)), closes [#59](https://github.com/crystal-ball/webpack-base/issue/59)

#### Chore

* Reconfigure Renovate (#57)([842116a](https://github.com/crystal-ball/webpack-base/commit/842116a8be57ba1ba673833c513270959790c144)), closes [#57](https://github.com/crystal-ball/webpack-base/issue/57)

## [5.2.0](https://github.com/crystal-ball/webpack-base/compare/v5.1.0...v5.2.0) (2019-07-28)


#### ✨ Update

* Dependencies update 🆙 (#55)([80feb90](https://github.com/crystal-ball/webpack-base/commit/80feb90f826883ffd4b6257635c12e0fc489c204)), closes [#55](https://github.com/crystal-ball/webpack-base/issue/55)

#### Chore

* Bump Cypress to latest 🆙 (#42)([b7e2069](https://github.com/crystal-ball/webpack-base/commit/b7e2069a6cba6d81a08248cba20cac99fc719b7e)), closes [#42](https://github.com/crystal-ball/webpack-base/issue/42)

## [5.1.0](https://github.com/crystal-ball/webpack-base/compare/v5.0.0...v5.1.0) (2019-07-14)


#### ✨ Update

* Update dependency webpack-cli to v3.3.6 (#40)([9f8f3bd](https://github.com/crystal-ball/webpack-base/commit/9f8f3bd4e0e6e4da65b5d92e036cbd184aa2b4b2)), closes [#40](https://github.com/crystal-ball/webpack-base/issue/40)

#### Docs, Upgrade, Chore

* Update Changelog and Readme to match 🔮✨ (#41)([b458cba](https://github.com/crystal-ball/webpack-base/commit/b458cba8c851ab0ce751ae5a40a97ac0f3422f00)), closes [#41](https://github.com/crystal-ball/webpack-base/issue/41)
* Pin dependencies (#38)([1fb8960](https://github.com/crystal-ball/webpack-base/commit/1fb89601410c13374c34d0d7ec3f69c5d0b9d12e)), closes [#38](https://github.com/crystal-ball/webpack-base/issue/38)
* Configure Renovate (#34)([98207f6](https://github.com/crystal-ball/webpack-base/commit/98207f6ae6e11f3f25314693c86ce3ad60e05c47)), closes [#34](https://github.com/crystal-ball/webpack-base/issue/34)

## [5.0.0](https://github.com/crystal-ball/webpack-base/compare/v4.3.0...v5.0.0) (2019-07-13)


### 💥 Breaking Changes!

* The latest eslint-loader requires eslint version 6


#### ✨ Update

* Bump project dependencies to latest version 💖 (#36)([3ab1b0c](https://github.com/crystal-ball/webpack-base/commit/3ab1b0c5d5d7d0862a611ee2578f724af3af0479)), closes [#36](https://github.com/crystal-ball/webpack-base/issue/36)

#### Chore

* Fix travis deploy script requiring node modules install 🔧([5c153b4](https://github.com/crystal-ball/webpack-base/commit/5c153b4dddd0eb22928da06b3f1532e0047cfbc2))
