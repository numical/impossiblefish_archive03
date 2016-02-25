import React from 'react'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import menu from '../reducers/menu.js'
import console from '../reducers/console.js'
import fish from '../reducers/fish.js'
import App from '../views/app.js'

const rootReducer = combineReducers({ fish, console, menu }),
      store = createStore( rootReducer )

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
)

