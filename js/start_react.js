'use strict'

require('../static/impossiblefish.css')

// polyfills & other language extensions
import 'babel-polyfill'

// static javascript assets using es6 modules (transpiled by babel for webpack)
import 'react'
import { render } from 'react-dom'
import app from './components/app.js'

const STARTUP_TIME = require('./constants/startuptime.js')
const STARTUP_GRAPHIC_DURATION = 2000

function startReact () {
  render(app(), document.getElementById('react-container'))
}

// iife to scope React instantiation
(() => {
  let loadTime = Date.now() - window[STARTUP_TIME]
  if (loadTime > STARTUP_GRAPHIC_DURATION) {
    startReact()
  } else {
    setTimeout(startReact, STARTUP_GRAPHIC_DURATION - loadTime)
  }
})()
