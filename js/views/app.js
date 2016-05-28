import React from 'react'
import Fishtank from '../components/fishtank.js'
import Console from '../components/console.js'
import Menu from '../components/menu.js'
import Header from '../components/header.js'
import Footer from './footer.js'

export default () => (
  <div id='react-content'>
    <Header />
    <Console />
    <Fishtank />
    <Menu />
    <Footer />
  </div>
)
