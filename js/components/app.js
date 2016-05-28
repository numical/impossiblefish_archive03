import React from 'react'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import menu from '../reducers/menu.js'
import console from '../reducers/console.js'
import fishtank from '../reducers/fishtank.js'
import animation from '../reducers/animation.js'
import preferences from '../reducers/preferences.js'
import App from '../views/app.js'

const rootReducer = combineReducers({fishtank, console, menu, animation, preferences})
const store = createStore(rootReducer, applyMiddleware(thunk))

export default () => {
  // render
  return (
    <Provider store={store}>
      <App />
    </Provider>)
}
