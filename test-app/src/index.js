import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import svgSymbolSpriteLoader from 'svg-symbol-sprite-loader'

// ========================================================
// Application Core Elements
// ========================================================
// ⚠️ Import application styles before application components so that base CSS
// styles are included before component styles.
import './index.scss'
import './lib/require-icons'
import App from './components/App/App'
import store from './dux/store'

// Injects SVG symbol sprite into document from local storage if it exists,
// otherwise fetch, cache in local storage and inject.
svgSymbolSpriteLoader({ useCache: process.env.NODE_ENV === 'production' })

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
