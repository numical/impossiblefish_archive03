'use strict'

require('../static/impossiblefish.css')

// polyfills & other language extensions
import 'babel-polyfill'

// static javascript assets using es6 modules (transpiled by babel for webpack)
import 'react'
import { render } from 'react-dom'
import app from './components/app.js'
import { STARTUP_TIME, STARTUP_ANIMATION_DURATION } from './constants.js'

function startReact () {
  render(app(), document.getElementById('react-container'))
}

// iife to scope React instantiation
(() => {
  const loadTime = Date.now() - window[STARTUP_TIME]
  if (loadTime > STARTUP_ANIMATION_DURATION) {
    startReact()
  } else {
    setTimeout(startReact, STARTUP_ANIMATION_DURATION - loadTime)
  }
})()
