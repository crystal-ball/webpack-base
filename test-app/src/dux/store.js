/* eslint-env node */
import { applyMiddleware, createStore, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

// In dev envs and when app is entered in debug mode use the redux devtools compose
// otherwise fallback to redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  process.env.NODE_ENV === 'development' || window.location.href.includes('debug=true')
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose

// Create store, overriding preloaded state if needed
const store = createStore(
  rootReducer,
  /* preloadedState, */
  composeEnhancers(applyMiddleware(sagaMiddleware))
)

// Fire up those generators
sagaMiddleware.run(rootSaga)

// Accept hot reload for reducers in dev envs
if (module.hot) {
  module.hot.accept('./reducers', () => {
    store.replaceReducer(rootReducer)
  })
}

export default store
