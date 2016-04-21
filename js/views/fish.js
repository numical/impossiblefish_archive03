import React from 'react'
import {Shape} from 'react-konva'

const Fish = React.createClass({

  render () {
    return (
      <Shape fill='#00D2FF' draggable
        sceneFunc={function (ctx) {
          ctx.beginPath()
          ctx.moveTo(10, 25)
          ctx.lineTo(110, 40)
          ctx.quadraticCurveTo(75, 50, 130, 85)
          ctx.closePath()
          ctx.fillStrokeShape(this)
        }}
      />
    )
  }
})

export default Fish
