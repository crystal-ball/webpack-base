const parser = require('./parser')

test('parser Markdown', () => {
  const markdown = '# Test Header'
  expect(parser(markdown)).toEqual('<h1>Test Header</h1>\n')
})
