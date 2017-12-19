# Application Media

## Icons

InspireScript encourages the use of SVGs for icons for accessibility. The build
system can be used to automatically create optimized SVG sprites of _only_ the
icons used in a project.

#### Icon system

1. Bundle only used SVGs into an SVG sprite.
1. On app load, inject the SVG sprite into the DOM. _(This solves issues with IE
   and Edge browsers not supporting referencing external files via
   `<use xlink:href>` )_

#### Usage

1. Save the SVG file to `/scr/media/icons`.
1. Use the `<Icon />` component with the id of the SVG element.
1. The Icon component will handle dynamically importing your SVG through the
   `svg-sprite-loader`. This will add it to your icon bundle as part of the
   webpack build.

```javascript
// RadicalComponent.jsx
// To use SVG `rad.svg` saved in `media/icons/rad.svg`
import Icon from 'components/universal/Icon'

// ...
  <span>
    <Icon id="rad" /> Here is some really rad tricks I've learned...
  </span>
```

#### Icon include paths

If you need to use an SVG from a source other than `/scr/media/icons` you can
set the `iconsSpriteLoader` property in the webpack paths config:

```javascript
// webpack.congif.js
const baseConfig = createBaseConfigs({
  env,
  paths: {
    context: resolve(__dirname),
    // Sprite all icons imported from src/media/icons and from node_modules
    iconsSpriteLoader: [resolve('src/media/icons'), resolve('node_modules')],
  },
})
```
