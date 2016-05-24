'use strict'

export function drawFish (fish, ctx) {
  const units = fish.FEM
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
