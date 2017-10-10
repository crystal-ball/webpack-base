# Application Media

## Icons
InspireScript encourages the use of SVGs for icons for accessibility. The build
system can be used to automatically create optimized SVG sprites of _only_ the icons
used in a project.

#### Icon System
1. Bundle only used SVGs into an SVG sprite.
2. On app load, inject the SVG sprite into the DOM. _(This solves issues with IE and
   Edge browsers not supporting referencing external files via `<use xlink:href>` )_

#### Usage
1. Save the SVG file to `/scr/media/icons`.
2. Import the icon into your component file, (relative paths supported) and use it
   with an SVG element
```javascript
// RadicalComponent.jsx
import radIcon from 'media/icons/rad.svg'

// ...
  <span>
    <svg><use href={`#${radIcon.id}`} /></svg>
  </span>
```

#### Icon Include Paths
If you need to use an SVG from a source other than `/scr/media/icons` you can set
the `iconsSpriteLoader` property in the Webpack paths config:
```javascript
// webpack.congif.js
const baseConfig = createBaseConfigs({
  env,
  paths: {
    context: resolve(__dirname),
    // Sprite all icons imported from src/media/icons and from node_modules
    iconsSpriteLoader: [resolve('src/media/icons'), resolve('node_modules')]
  },
})
```