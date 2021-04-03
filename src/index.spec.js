/* eslint-disable node/no-process-env */

'use strict'

const webpackBase = require('./index')

// Mocks to ensure snapshots output consistent values based on configs used
jest.mock('mini-css-extract-plugin')

describe('webpack-base', () => {
  beforeEach(() => {
    // Ensure a consistent working directory is used for paths generated in
    // snapshots
    process.cwd = () => '/test/cwd/path'
  })

  it('returns loader and plugin components', () => {
    process.env.NODE_ENV = 'development'

    const { loaders, plugins } = webpackBase({ paths: { context: '/test' } })

    expect({ loaders, plugins }).toMatchSnapshot()
  })

  it('returns expected dev configs', () => {
    process.env.NODE_ENV = 'development'

    const { configs } = webpackBase({ paths: { context: '/test' } })

    expect(configs).toMatchSnapshot()
  })

  it('returns expected prod configs', () => {
    process.env.NODE_ENV = 'production'

    const { configs } = webpackBase({ paths: { context: '/test' } })

    expect(configs).toMatchSnapshot()
  })

  it('returns expected storybook configs', () => {
    process.env.NODE_ENV = 'development'

    const { configs } = webpackBase({
      target: 'storybook',
      paths: { context: '/test' },
    })

    expect(configs).toMatchSnapshot()
  })

  it('returns expected electron dev configs', () => {
    process.env.NODE_ENV = 'development'

    const { configs } = webpackBase({
      target: 'electron-renderer',
      paths: { context: '/test' },
    })

    expect(configs).toMatchSnapshot()
  })

  it('returns expected electron prod configs', () => {
    process.env.NODE_ENV = 'production'

    const { configs } = webpackBase({
      target: 'electron-renderer',
      paths: { context: '/test' },
    })

    expect(configs).toMatchSnapshot()
  })
})
