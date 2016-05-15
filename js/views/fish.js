import React from 'react'
import {Shape} from 'react-konva'

const FISH_UNIT = 6
const FISH_SCALE = 1
const FEM = FISH_UNIT * FISH_SCALE

const Fish = React.createClass({

  getInitialState () {
    return {
      x: 0,
      y: 300,
      rotation: 0,
      bounds: {
        x: 1200,
        y: 600
      }
    }
  },

  progressAnimation () {
    const rotation = (this.state.rotation > 359) ? 0 : this.state.rotation + FEM
    const x = (this.state.x >= this.state.bounds.x ) ? 0 : this.state.x + FEM
    const y = (this.state.y >= this.state.bounds.y ) ? 0 : this.state.y + FEM/2
    const state = Object.assign({}, this.state, {x: x, y: y, rotation: rotation})
    this.setState(state)
    window.requestAnimationFrame(this.progressAnimation)
  },

  componentDidMount () {
    window.requestAnimationFrame(this.progressAnimation)
  },

  render () {
    return (
      <Shape 
        x = {this.state.x}
        y = {this.state.y}
        rotation = {this.state.rotation}  
        //draggable
        drawFunc={function (ctx) {
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
        }}
      />
    )
  }
})

export default Fish
