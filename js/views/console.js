import React from 'react'
import { findDOMNode } from 'react-dom'
import { CURSOR } from '../constants/console.js'

const ConsoleView = React.createClass({

  render(){
    if ( !this.props.visible ) return null
    return (
      <div id='console' contentEditable={true} onKeyPress={this.handleKeyPress} onKeyDown={this.handleKeyDown}>
        <div contentEditable={false}>
          {this.props.history.map( (line,index) => <div key={index}>{line}</div> )}
        </div>
        <div key= 'input' ref='input'>{CURSOR}</div>
      </div> 
    )
  },

  handleKeyPress( synthKeyEvent ){
    if ( 'Enter' === synthKeyEvent.key ) {
      let command = this.refs.input.innerText  
      if ( command.startsWith( CURSOR ) ) {
        command = command.substring( CURSOR.length )  
      }
      this.props.processCommand( command )
      synthKeyEvent.preventDefault() // important else browers add new child div in response to 'Enter'
    }
  },

  handleKeyDown( synthKeyEvent ){
    if ( 'Backspace' === synthKeyEvent.key && CURSOR === this.refs.input.innerText ) {
      synthKeyEvent.preventDefault();
    }
  },

  componentDidUpdate(){ 
    if ( this.props.visible ) {
      this.resetInputElement() 
    }
  },

  resetInputElement(){
    const input = this.refs.input,
          selection = window.getSelection(),
          range = document.createRange()
    input.innerText = CURSOR
    input.scrollIntoView()
    // set caret
    range.setStart(input, CURSOR.length)
    range.setEnd(input, CURSOR.length)
    selection.removeAllRanges()
    selection.addRange(range)
  }
  
})

export default ConsoleView
