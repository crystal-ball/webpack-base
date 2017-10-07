import { createStore } from 'redux'

import rootReducer from './reducers'

let storeEnhancers
if (process.env.NODE_ENV === 'development') {
  storeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line
}

export default createStore(rootReducer, storeEnhancers)
