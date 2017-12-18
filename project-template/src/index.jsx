/* eslint-env node */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
/* eslint-disable import/no-extraneous-dependencies */
import localStorageSVGLoader from 'svg-symbol-sprite-loader/src/local-storage-svg-loader'
import { AppContainer } from 'react-hot-loader'

// Application core elements: View, State and Styles
import App from './components/App'
import createStore from './state-container/createStore'
import './styles/index.scss'

localStorageSVGLoader(window.manifest['icon-sprite.svg'])

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={createStore}>
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
