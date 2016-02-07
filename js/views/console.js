import React from 'react'
import { findDOMNode } from 'react-dom'

const CURSOR = ':'

const ConsoleView = React.createClass({

  render(){
    // if ( !this.props.visible ) return null
    return (
      <div id='console' contentEditable={true} style={this.getStyle()}>
        {this.props.history.map( line => <div contentEditable={false}>{line}</div> )}
        <div ref='input'>{CURSOR}</div>
      </div>
    )
  },

  setFocusOnInput(){
    if ( this.props.visible ) {
      findDOMNode(this.refs.input).focus()
    }
  },

  componentDidMount(){ this.setFocusOnInput() },

  componentDidUpdate(){ this.setFocusOnInput() },

  getStyle(){
    return {
      display: this.props.visible ? 'block' : 'none'
    }
  }
})

export default ConsoleView
