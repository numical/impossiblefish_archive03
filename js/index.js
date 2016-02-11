// static non-javascript assets for webpack
require( '../static/impossiblefish.css' );

// static javascript assets using es6 modules (transpiled by babel for webpack) 
import React from 'react'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import menu from './reducers/menu.js'
import console from './reducers/console.js'
import App from './views/app.js'

(function(){
  const rootReducer = combineReducers({ menu, console }),
        store = createStore( rootReducer ),
        root = (
           <Provider store={store}>
            <App />
          </Provider> )

  render( root, document.getElementById('react-container' ) )
})()
