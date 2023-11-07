import { createStore, applyMiddleware } from 'redux'
import rootReducer from './rootReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

store.subscribe (() => {
  const state = store.getState()
  window.localStorage.setItem('currentState', JSON.stringify(state))
})

export default store
