const webpackConfigs = require('./index')

// Mock plugin to ensure snapshot paths are agnostic to machine
jest.mock('mini-css-extract-plugin')
global.cwd = () => '/test/cwd/path'

describe('webpack-configs', () => {
  beforeEach(() => {
    // Ensures cwd() passed to clean plugin is stable
    process.cwd = () => '/test/cwd/path'
  })

  test('returns expected dev configs', () => {
    const baseConfigs = webpackConfigs({
      env: 'development',
      paths: { context: '/test' },
    })
    expect(baseConfigs).toMatchSnapshot()
  })

  test('returns expected prod configs', () => {
    const baseConfigs = webpackConfigs({
      env: 'production',
      paths: { context: '/test' },
    })
    expect(baseConfigs).toMatchSnapshot()
  })
})
