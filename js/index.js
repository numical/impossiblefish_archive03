// static non-javascript assets for webpack
require( '../static/impossiblefish.css' )

// polyfills & other language extensions
require( 'es6-object-assign' ).polyfill()   // webkit and mobile browsers
require( 'string.prototype.startswith' )    // IE and mobile browsers 
require( 'seedrandom' )                     // for repeatable random numbers

// static javascript assets using es6 modules (transpiled by babel for webpack) 
import React from 'react'
import { render } from 'react-dom'
import app from './components/app.js'

// iife to contain & start React
(function(){
  render( app(), document.getElementById('react-container') )
})()
