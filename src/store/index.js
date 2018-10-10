import { isFunction } from 'lodash-es'
import { 
  applyMiddleware, 
  compose,
  createStore
} from 'redux'
import logger from 'redux-logger'
import ReduxPromise from 'redux-promise'
import thunk from 'redux-thunk'

import reducers from './reducers'

const initialState = {}

const middlewares = () => {
  const middlewares = [
    ReduxPromise,
    thunk
  ]

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
  }

  return middlewares
}

const enhancers = () => {
  const enhancers = []
  const devToolExtension = window.devToolsExtension

  if (
    process.env.NODE_ENV === 'development' 
    &&
    isFunction(devToolExtension)
  ) {
    enhancers.push(devToolExtension())
  }

  return enhancers
}

const composedEnhancers = compose(
  applyMiddleware(...middlewares()),
  ...enhancers()
)

class Store {
  constructor(store) {
    this.store = store
  }

  getState = () => {
    return this.store.getState()
  }

  getStore = () => {
    return this.store
  }
}

const store = new Store(
  createStore(
    reducers, 
    initialState, 
    composedEnhancers
  )
)

// exporting one instance of the store only
export default store.getStore()