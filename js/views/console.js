import React from 'react'
import { findDOMNode } from 'react-dom'

const CURSOR = ':'

const ConsoleView = React.createClass({

  render(){
    return (
      <div id='console' 
           contentEditable={true}
           style={this.getStyle()}>
        {this.props.history.map( line => <div contentEditable={false}>{line}</div> )}
        <div ref='focus'>{CURSOR}</div>
      </div>
    )
  },

  getStyle(){
    return {
      display: this.props.visible ? 'block' : 'none'
    }
  },

  componentDidMount(){
    findDOMNode(this.refs.focus).focus()
  }
})

export default ConsoleView
