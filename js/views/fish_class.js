'use strict'
import React from 'react'
import { Shape } from 'react-konva'

const STYLES = {
  SOLID: (units, ctx) => {
    ctx.fillStyle = 'yellow'
    ctx.beginPath()
    ctx.moveTo(5 * units, 0)
    ctx.quadraticCurveTo(units, -4 * units, -5 * units, 2 * units)
    ctx.lineTo(-5 * units, -2 * units)
    ctx.quadraticCurveTo(units, 4 * units, 5 * units, 0)
    ctx.fill()
    ctx.moveTo(3 * units, 0)
    ctx.lineTo(4 * units, 0)
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.fillStrokeShape(this.refs.shape)
  },
  OUTLINE: (units, ctx) => {
    ctx.lineWidth = 2
    ctx.strokeStyle = 'yellow'
    ctx.beginPath()
    ctx.moveTo(5 * units, 0)
    ctx.quadraticCurveTo(units, -4 * units, -5 * units, 2 * units)
    ctx.moveTo(5 * units, 0)
    ctx.quadraticCurveTo(units, 4 * units, -5 * units, -2 * units)
    ctx.moveTo(3 * units, 0)
    ctx.lineTo(4 * units, 0)
    ctx.stroke()
  },
  RECTANGLE: (units, ctx) => {
    ctx.fillStyle = 'yellow'
    ctx.beginPath()
    ctx.rect(-5 * units, -3 * units, 10 * units, 6 * units)
    ctx.fill()
  }
}

export default React.createClass({

  componentWillMount () {
    this.sceneFn = STYLES.SOLID.bind(this, this.props.model.FEM)
  },

  componentDidMount () {
    const units = this.props.model.FEM
    this.refs.shape.cache({
      x: -5 * units,
      y: -3 * units,
      width: 10 * units,
      height: 6 * units,
      drawBorder: false
    })
  },

  render () {
    const { x, y, rotation } = this.props.model
    return (
      <Shape
        ref='shape'
        x={x}
        y={y}
        rotation={rotation}
        sceneFunc={this.sceneFn}
        onClick={this.props.click}
      />
    )
  }
})
