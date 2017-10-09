/* eslint-env node */
import { applyMiddleware, createStore, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

// Compose store enhancers, checking for redux devtools extension in non prod envs
let storeEnhancers
if (process.env.NODE_ENV === 'production') {
  storeEnhancers = compose(applyMiddleware(sagaMiddleware))
} else {
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  storeEnhancers = composeEnhancers(applyMiddleware(sagaMiddleware))
}

// Create store, overriding preloaded state if needed
const store = createStore(
  rootReducer,
  /* preloadedState, */
  storeEnhancers,
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
