const parser = require('./parser')

// ℹ️ This is a single YUGE test that includes all of the special cases we're trying
// to handle

test('parser Markdown', () => {
  const markdown = `# Test Header

<!-- Test inline token component matching inside markdown block components -->
This is a paragraph with an <Icon id="exclamation className={iconClass} /> Icon
inside of it. The Icon component should not be altered. It also should not alter
<Button outline color="primary>Block</Button> components.

* <StatefulNameLink {...props.conceptsRoutesMap.accessibility} /> covers out of the
    box accessibility provided by Componentry and recommendations for creating.
* <StatefulNameLink {...props.conceptsRoutesMap.theming} /> covers customizing the
    styles and icons for Bootstrap + Componentry using SASS variables.
* <StatefulNameLink {...props.conceptsRoutesMap.apis} /> covers the APIs Componentry
    components expose for composing and customizing new components.

<!-- Test React component starting a markdown block paragraph token -->
<Test valid attr={value} /> This paragraph starts with a component, the component
should not be altered and the paragraph should be wrapped in a p tag.

<!--
TODO: make me work!
<Tricky.Component
  spans={lines + maxLines}
  classNames="d-flex party zone ultra long
/>{' '}
This paragraph is a realllll tricky one.
-->

<!-- Test nested inline token block components -->
This tests nested <RadButton><RadButton>component</RadButton> with text</RadButton>
_components_ matching. <RadButton><RadButton outline /></RadButton>

<!-- Test single line block token self closing component -->

<Icon id={someId} />
<ComponentsList components={['Active', 'Active.Trigger', 'Active.Content']} />
{/* some JSX block */}

<!-- Test multiline block token self closing component -->

<Icon
  id={someId}
/>
<ComponentsList
  components={['Active', 'Active.Trigger', 'Active.Content']}
  outline
  classNames="long component"
/>

<!-- Test single line block token block component -->
<Button>Hey</Button>

<!-- Test multi line block token block component -->
<Button>
  Hey
</Button>

<Card.Body>
  This block tests that names with '.' are parsed correctly.
</Card.Body>


{someArray.map(child => (
  <Button {...child}>{child.name}</Button>
))}

<!-- Test remove html comment -->

<!--
  Test remove multine HTML comment
-->`

  const expected = `<h1>Test Header</h1>
<p>This is a paragraph with an <Icon id="exclamation className={iconClass} /> Icon
inside of it. The Icon component should not be altered. It also should not alter
<Button outline color="primary>Block</Button> components.</p>
<ul>
<li><StatefulNameLink {...props.conceptsRoutesMap.accessibility} /> covers out of the
box accessibility provided by Componentry and recommendations for creating.</li>
<li><StatefulNameLink {...props.conceptsRoutesMap.theming} /> covers customizing the
styles and icons for Bootstrap + Componentry using SASS variables.</li>
<li><StatefulNameLink {...props.conceptsRoutesMap.apis} /> covers the APIs Componentry
components expose for composing and customizing new components.</li>
</ul>
<p><Test valid attr={value} /> This paragraph starts with a component, the component
should not be altered and the paragraph should be wrapped in a p tag.</p>
<p>This tests nested <RadButton><RadButton>component</RadButton> with text</RadButton>
<em>components</em> matching. <RadButton><RadButton outline /></RadButton></p>
<Icon id={someId} />
<ComponentsList components={['Active', 'Active.Trigger', 'Active.Content']} />
{/* some JSX block */}
<Icon
  id={someId}
/>
<ComponentsList
  components={['Active', 'Active.Trigger', 'Active.Content']}
  outline
  classNames="long component"
/>
<Button>Hey</Button>
<Button>
  Hey
</Button>
<Card.Body>
  This block tests that names with '.' are parsed correctly.
</Card.Body>
{someArray.map(child => (
  <Button {...child}>{child.name}</Button>
))}
`

  expect(parser(markdown)).toEqual(expected)
})
