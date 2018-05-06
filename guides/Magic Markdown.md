# 🔮 InspireScript Magic Markdown

Magic Markdown in InspireScript projects enable you to include JSX in your
markdown. JSX expressions, combined with Redux, makes it possible to include
powerful, custom functionality in you application.

## System

The Magic Markdown system has two parts: a component registry, and a webpack
loader.

1.  **Component registry** - dynamically includes project components for use in
    Magic Markdown content.
1.  **webpack loader** - parses Magic Markdown content into valid JSX which is
    then wrapped in a component and transpiled by Babel.

## ⚠️ Restrictions

The current Magic Markdown capabilities are layered onto the functional
requirements of Markdown. Markdown is parsed into a series of block level tokens
with content that is then parsed into a series of inline level tokens. JSX in
Magic Markdown content is also parsed in this block -> inline token process.
Block level JSX must utilize newlines to signal its block token status to the
parser.

#### Don't

```markdown
<InspireScript radical>
  <AmazingFeature id={data} />
</InspireScript>
Don't include content after a block without an empty line
```

#### Do

```markdown
<InspireScript radical>
  <AmazingFeature id={data} />
</InspireScript>

Do include an empty line after block components
```
