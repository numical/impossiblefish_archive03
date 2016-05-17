import React from 'react'
import { findDOMNode } from 'react-dom'
import { Stage, Layer, Shape } from 'react-konva'
import { getCSSBoxInfo } from '../util/DOMUtil.js'

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
    })
  },

  componentWillUnmount () {
    RESIZE_EVENTS.forEach((event) => {
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
            {this.props.fish.map(renderFish)}
          </Layer>
        </Stage>
      </div>)
  }
})

const renderFish = (props) => {
  return (
    <Shape
      key={props.id}
      x={props.x}
      y={props.y}
      rotation={props.rotation}
      sceneFunc={drawFish.bind(null, props.FEM)}
    />
  )
}

const drawFish = (FEM, ctx) => {
  ctx.lineWidth = 2
  ctx.strokeStyle = 'yellow'
  ctx.beginPath()
  ctx.moveTo(-5 * FEM, 0)
  ctx.quadraticCurveTo(-1 * FEM, -4 * FEM, 5 * FEM, 2 * FEM)
  ctx.moveTo(-5 * FEM, 0)
  ctx.quadraticCurveTo(-1 * FEM, 4 * FEM, 5 * FEM, -2 * FEM)
  ctx.moveTo(-4 * FEM, 0)
  ctx.lineTo(-3 * FEM, 0)
  ctx.stroke()
}

export default FishtankView
