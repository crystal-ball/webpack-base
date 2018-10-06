const webpackBase = require('./index')

// Mocks to ensure snapshots output consistent values based on configs used
jest.mock('mini-css-extract-plugin')

describe('webpack-base', () => {
  beforeEach(() => {
    // Ensure a consistent working directory is used for paths generated in
    // snapshots
    process.cwd = () => '/test/cwd/path'
  })

  test('returns loader and plugin components', () => {
    process.env.NODE_ENV = 'development'

    const components = webpackBase.components({ paths: { context: '/test' } })
    expect(components).toMatchSnapshot()
  })

  test('returns expected dev configs', () => {
    process.env.NODE_ENV = 'development'

    const baseConfigs = webpackBase({ paths: { context: '/test' } })
    expect(baseConfigs).toMatchSnapshot()
  })

  test('returns expected prod configs', () => {
    process.env.NODE_ENV = 'production'

    const baseConfigs = webpackBase({ paths: { context: '/test' } })
    expect(baseConfigs).toMatchSnapshot()
  })

  test('returns expected electron dev configs', () => {
    process.argv.push('--electron')
    process.env.NODE_ENV = 'development'

    const baseConfigs = webpackBase({ paths: { context: '/test' } })
    expect(baseConfigs).toMatchSnapshot()
  })

  test('returns expected electron prod configs', () => {
    // argv should include --electron
    process.env.NODE_ENV = 'production'

    const baseConfigs = webpackBase({ paths: { context: '/test' } })
    expect(baseConfigs).toMatchSnapshot()
  })
})
