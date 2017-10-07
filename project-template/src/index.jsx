/* eslint-env node */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'

import App from './components/App'
import createStore from './scm/createStore'

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
