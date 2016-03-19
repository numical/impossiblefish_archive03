require('../static/impossiblefish.css')

// polyfills & other language extensions
import 'babel-polyfill'

// static javascript assets using es6 modules (transpiled by babel for webpack)
import 'react'
import { render } from 'react-dom'
import app from './components/app.js'

// iife to scope React instantiation
;(() => {
  render(app(), document.getElementById('react-container'))
})()
