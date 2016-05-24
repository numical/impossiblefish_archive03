'use strict'

import Counter from '../util/counter.js'
import { randomInt } from '../util/random.js'
import TWEEN from 'tween.js'

const FISH_SCALE = 1
const FISH_UNIT = 6
const FISH_ID = new Counter()

export function newFish (fishtank) {
  const initialPos = {
    x: randomInt(fishtank.size.width),
    y: randomInt(fishtank.size.height),
    rotation: 0
  }
  createMovement(initialPos, fishtank)
  return {
    id: FISH_ID.next(),
    x: initialPos.x,
    y: initialPos.y,
    rotation: initialPos.rotation,
    tweenPos: initialPos,
    FEM: FISH_UNIT * FISH_SCALE
  }
}

export function incrementFishPosition (fish, fishtank) {
  /*
  const x = fish.tweenPos.x > fishtank.size.width
          ? fish.tweenPos.x - fishtank.size.width
          : fish.tweenPos.x
  const y = fish.tweenPos.y > fishtank.size.height
          ? fish.tweenPos.y - fishtank.size.height
          : fish.tweenPos.y
  */
  return Object.assign({}, fish, {
    x: fish.tweenPos.x,
    y: fish.tweenPos.y,
    rotation: fish.tweenPos.rotation
  })
}

function createMovement (position, fishtank) {
  const finalPos = {
    x: randomInt(fishtank.size.width),
    y: randomInt(fishtank.size.height)
  }
  const rotate = new TWEEN.Tween(position)
    .to({rotation: calculateAngle(position, finalPos)}, 1000)
    .easing(TWEEN.Easing.Exponential.Out)
  const move = new TWEEN.Tween(position)
    .to({x: finalPos.x, y: finalPos.y}, 3000)
    .easing(TWEEN.Easing.Exponential.Out)
    .onComplete(() => {
      createMovement(position, fishtank)
    })
  rotate.chain(move).start()
}

function calculateAngle (fromPos, toPos) {
  const y = toPos.y - fromPos.y
  const x = toPos.x - fromPos.x
  return Math.floor((Math.atan2(y, x) / Math.PI) * 180)
}

