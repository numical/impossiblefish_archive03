import React from 'react'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import menu from '../reducers/menu.js'
import console from '../reducers/console.js'
import fishtank from '../reducers/fishtank.js'
import { animate } from '../constants/actions.js'
import App from '../views/app.js'

const rootReducer = combineReducers({fishtank, console, menu})
const store = createStore(rootReducer)

export default (window) => {
  // animation
  const animation = () => {
    store.dispatch(animate())
    window.requestAnimationFrame(animation)
  }
  window.requestAnimationFrame(animation)
  // render
  return (
    <Provider store={store}>
      <App />
    </Provider>)
}
