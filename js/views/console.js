import React from 'react'
import { findDOMNode } from 'react-dom'
import { CURSOR } from '../constants/console.js'

const ConsoleView = React.createClass({

  keyBuffer: [],

  render(){
    if ( !this.props.visible ) return null
    return (
      <div id='console' contentEditable={true} onKeyPress={this.handleKeyPress}>
        <div contentEditable={false}>
          {this.props.history.map( (line,index) => <div key={index}>{line}</div> )}
        </div>
        <div key= 'input' ref='input'>{CURSOR}</div>
      </div>
    )
  },

  handleKeyPress( synthKeyEvent ){
    if ( 'Enter' === synthKeyEvent.key ) {
      const command = String.fromCharCode( ...this.keyBuffer )
      this.props.processCommand( command )
      this.clearInputElement();
    } else {
        this.keyBuffer.push( synthKeyEvent.keyCode || synthKeyEvent.which )
    }
  },

  clearInputElement() {
    this.keyBuffer = []
    this.refs.input.innerHTML = CURSOR
    setFocusOnInput()
  },

  componentDidUpdate(){ 
    if ( this.props.visible ) {
      this.setFocusOnInputElement() 
    }
  },

  setFocusOnInputElement(){
    const n = findDOMNode(this.refs.input),
          s = window.getSelection(),
          r = document.createRange()
    r.setStart(n, 1)
    r.setEnd(n, 1)
    s.removeAllRanges()
    s.addRange(r)
  }
  
})

export default ConsoleView
