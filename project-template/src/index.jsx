/* eslint-env node */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
/* eslint-disable import/no-extraneous-dependencies */
import localStorageSVGLoader from 'svg-symbol-sprite-loader/src/local-storage-svg-loader'
import { AppContainer } from 'react-hot-loader'

// ========================================================
// Application Core Elements
// ========================================================
// ⚠️ Import application styles before application components so that base CSS
// styles are included before component styles.
import './styles/index.scss'
import App from './components/App'
import store from './state-container/store'

localStorageSVGLoader(window.manifest['icon-sprite.svg'])

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App)
  })
}
