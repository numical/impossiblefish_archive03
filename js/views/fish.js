'use strict'
import React from 'react'
import { Shape } from 'react-konva'

export default React.createClass({

  render () {
    const { id, x, y, rotation } = this.props.model
    return (
      <Shape
        key={id}
        x={x}
        y={y}
        rotation={rotation}
        sceneFunc={this.draw}
      />
    )
  },

  draw (ctx) {
    const units = this.props.model.FEM
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
  }
})
