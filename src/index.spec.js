const webpackConfigs = require('./index')

// Mocks to ensure snapshots output consistent values based on configs used
jest.mock('mini-css-extract-plugin')

describe('webpack-configs', () => {
  beforeEach(() => {
    // Ensure a consistent working directory is used for paths generated in
    // snapshots
    process.cwd = () => '/test/cwd/path'
  })

  test('returns expected dev configs', () => {
    // webpack-serve sets an environment variable
    process.env.WEBPACK_SERVE = true
    const baseConfigs = webpackConfigs({
      env: 'development',
      paths: { context: '/test' },
    })
    expect(baseConfigs).toMatchSnapshot()
  })

  test('returns expected prod configs', () => {
    // Remove the webpack serve env variable
    delete process.env.WEBPACK_SERVE
    const baseConfigs = webpackConfigs({
      env: 'production',
      paths: { context: '/test' },
    })
    expect(baseConfigs).toMatchSnapshot()
  })
})
