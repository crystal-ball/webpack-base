/* eslint-env node */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
/* eslint-disable import/no-extraneous-dependencies */
import { AppContainer } from 'react-hot-loader'

// Application core elements: View, State and Styles
import App from './components/App'
import createStore from './scm/createStore'
import './styles/index.scss'

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