const webpackBase = require('./index')

// Mocks to ensure snapshots output consistent values based on configs used
jest.mock('mini-css-extract-plugin')

process.argv.push('--mode=')

describe('webpack-base', () => {
  beforeEach(() => {
    // Ensure a consistent working directory is used for paths generated in
    // snapshots
    process.cwd = () => '/test/cwd/path'
  })

  test('returns expected dev configs', () => {
    process.argv = process.argv.map(
      arg => (arg.includes('mode=') ? '--mode=development' : arg)
    )

    const baseConfigs = webpackBase({ paths: { context: '/test' } })
    expect(baseConfigs).toMatchSnapshot()
  })

  test('returns expected prod configs', () => {
    process.argv = process.argv.map(
      arg => (arg.includes('mode=') ? '--mode=production' : arg)
    )

    const baseConfigs = webpackBase({ paths: { context: '/test' } })
    expect(baseConfigs).toMatchSnapshot()
  })

  test('returns expected docker dev configs', () => {
    process.argv = process.argv.map(
      arg => (arg.includes('mode=') ? '--mode=development' : arg)
    )
    // Add Docker configs
    process.argv.push('--docker')

    const baseConfigs = webpackBase({ paths: { context: '/test' } })
    expect(baseConfigs).toMatchSnapshot()
  })
})
