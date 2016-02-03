// static non-javascript assets for webpack
require( '../static/impossiblefish.css' );

// static javascript assets using es6 modules (transpiled by babel for webpack) 
import React from 'react'
import ReactDOM from 'react-dom'
import Fishtank from './components/Fishtank.js'
import Console from './components/Console.js'
import Header from './components/Header.js'
import Footer from './components/Footer.js'

const App = React.createClass({
  render(){ return (
    <div id='react-content'>
      <Header />
      <Fishtank />
      <Console />
      <Footer />
    </div>
  ) }
})


ReactDOM.render( <App />, document.getElementById('react-container') );
