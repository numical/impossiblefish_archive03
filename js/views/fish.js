import React from 'react'
import {Shape} from 'react-konva'

const FISH_UNIT = 6
const FISH_SCALE = 1
const FEM = FISH_UNIT * FISH_SCALE

const Fish = React.createClass({

  render () {
    return (
      <Shape fill='#00D2FF' draggable
        sceneFunc={function (ctx) {
          const x = 48
          const y = 48
          ctx.lineWidth = 2
          ctx.strokeStyle = 'yellow'
          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.quadraticCurveTo(x + 4 * FEM, y - 4 * FEM, x + 10 * FEM, y + 2 * FEM)
          ctx.moveTo(x, y)
          ctx.quadraticCurveTo(x + 4 * FEM, y + 4 * FEM, x + 10 * FEM, y - 2 * FEM)
          ctx.moveTo(x + 1 * FEM, y)
          ctx.lineTo(x + 2 * FEM, y)
          ctx.stroke()
        }}
      />
    )
  }
})

export default Fish
