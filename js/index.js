// static non-javascript assets for webpack
require( '../static/impossiblefish.css' )

// polyfills & other language extensions
require( 'es6-object-assign' ).polyfill()   // webkit and mobile browsers
require( 'string.prototype.startswith' )    // IE and mobile browsers 
require( 'seedrandom' )                     // for repeatable random numbers

// static javascript assets using es6 modules (transpiled by babel for webpack) 
import React from 'react'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import menu from './reducers/menu.js'
import console from './reducers/console.js'
import fish from './reducers/fish.js'
import App from './views/app.js'

// iife to contain & start React
(function(){
  const rootReducer = combineReducers({ fish, console, menu }),
        store = createStore( rootReducer ),
        root = (
           <Provider store={store}>
            <App />
          </Provider> )

  render( root, document.getElementById('react-container') )
})()
