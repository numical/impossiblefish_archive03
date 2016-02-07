import React from 'react'
import { findDOMNode } from 'react-dom'

const CURSOR = ':'

const ConsoleView = React.createClass({

  render(){
    // if ( !this.props.visible ) return null
    return (
      <div id='console' contentEditable={true} style={this.getStyle()}>
        <div contentEditable={false}>
          {this.props.history.map( line => <div>{line}</div> )}
        </div>
        <div ref='input'>{CURSOR}</div>
      </div>
    )
  },

  setFocusOnInput(){
    if ( this.props.visible ) {
      const n = findDOMNode(this.refs.input),
            s = window.getSelection(),
            r = document.createRange()
      r.setStart(n, 1)
      r.setEnd(n, 1)
      s.removeAllRanges()
      s.addRange(r)
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
