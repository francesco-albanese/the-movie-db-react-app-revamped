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
    middlewares.concat(logger)
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
    enhancers.concat(devToolExtension())
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

  getState() {
    return this.store.getState()
  }
}

// exporting a singleton so every component have access to the same store instance
export const store = new Store(
  createStore(
    reducers, 
    initialState, 
    composedEnhancers
  )
)