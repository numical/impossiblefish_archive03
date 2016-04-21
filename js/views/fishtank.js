import React from 'react'
import { findDOMNode } from 'react-dom'
import { Stage, Layer } from 'react-konva'
import { getCSSBoxInfo } from '../util/DOMUtil.js'
import Fish from './fish.js'

const FISHTANK = 'fishtank'
const CANVAS = 'canvas'
const CANVAS_STYLE = {background: '#E0EEEE'}
const RESIZE_EVENTS = ['resize', 'orientationchange']

const FishtankView = React.createClass({

  calculateHeight () {
    if (this.refs[FISHTANK]) {
      return this.refs[FISHTANK].clientHeight - this.state.box.vertical
    } else {
      return 0
    }
  },

  calculateWidth () {
    if (this.refs[FISHTANK]) {
      return this.refs[FISHTANK].clientWidth - this.state.box.horizontal
    } else {
      return 0
    }
  },

  rerender () {
    if (this.refs[CANVAS].width >= this.refs[FISHTANK].clientWidth) {
      this.setState(this.state)
    }
    this.setState(this.state)
  },

  componentDidMount () {
    const box = getCSSBoxInfo(findDOMNode(this.refs[CANVAS]))
    this.setState({ box: box })
    RESIZE_EVENTS.forEach((event) => {
      window.addEventListener(event, this.rerender)
      window.addEventListener(event, this.rerender)
    })
  },

  componentWillUnmount () {
    RESIZE_EVENTS.forEach((event) => {
      window.removeEventListener(event, this.rerender)
      window.removeEventListener(event, this.rerender)
    })
  },

  render () {
    return (
      <div id={FISHTANK} ref={FISHTANK} onClick={this.props.click}>
        <Stage
          className='tankBorder'
          ref={CANVAS}
          style={CANVAS_STYLE}
          height={this.calculateHeight()}
          width={this.calculateWidth()}>
          <Layer>
            <Fish/>
          </Layer>
        </Stage>
      </div>)
  }
})

export default FishtankView
