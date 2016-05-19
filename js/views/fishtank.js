import React from 'react'
import { findDOMNode } from 'react-dom'
import { Stage, Layer, Shape } from 'react-konva'
import { getCSSBoxInfo, getFirstChildWithTag } from '../util/DOMHacks.js'

const FISHTANK = 'fishtank'
const CANVAS_CONTAINER = 'canvas'
const CANVAS_CONTAINER_STYLE = {background: '#E0EEEE'}
const CANVAS_CONTAINER_CLASS = 'tankBorder'
const CANVAS_TAG = 'CANVAS'
const RESIZE_EVENTS = ['resize', 'orientationchange']

const FishtankView = React.createClass({

  componentDidMount () {
    const canvasContainer = findDOMNode(this.refs[CANVAS_CONTAINER])
    const state = {
      box: getCSSBoxInfo(canvasContainer),
      canvas: getFirstChildWithTag(canvasContainer, CANVAS_TAG)
    }
    const autoResize = () => {
      this.resize()
      RESIZE_EVENTS.forEach((event) => {
        window.addEventListener(event, this.resize)
      })
    }
    this.setState(state, autoResize)
  },

  componentWillUnmount () {
    RESIZE_EVENTS.forEach((event) => {
      window.removeEventListener(event, this.resize)
    })
  },

  resize () {
    if (this.state.canvas.width >= this.props.width | this.state.canvas.height >= this.props.height) {
      const width = this.refs[FISHTANK].clientWidth - this.state.box.horizontal
      const height = this.refs[FISHTANK].clientHeight - this.state.box.vertical
      this.props.resize(width, height)
    }
  },

  // this is here to cause a resize instead of a render if the console is added/removed
  shouldComponentUpdate (nextProps) {
    if (nextProps.console === this.props.console) {
      return true
    } else {
      this.resize() // note the dispatched action is async
      return false
    }
  },

  render () {
    return (
      <div id={FISHTANK} ref={FISHTANK} onClick={this.props.click}>
        <Stage
          ref={CANVAS_CONTAINER}
          className={CANVAS_CONTAINER_CLASS}
          style={CANVAS_CONTAINER_STYLE}
          height={this.props.height}
          width={this.props.width}>
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
