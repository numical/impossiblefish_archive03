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
  }
}

export default React.createClass({

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
    const { x, y, rotation, FEM } = this.props.model
    return (
      <Shape
        ref='shape'
        x={x}
        y={y}
        rotation={rotation}
        sceneFunc={STYLES.SOLID.bind(null, FEM)}
        onClick={this.props.click}
      />
    )
  }
})
