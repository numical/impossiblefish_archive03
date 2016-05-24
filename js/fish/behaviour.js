'use strict'

import Counter from '../util/counter.js'
import { randomInt } from '../util/random.js'
import TWEEN from 'tween.js'

const FISH_SCALE = 1
const FISH_UNIT = 6
const FEM = FISH_UNIT * FISH_SCALE
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
    FEM: FEM
  }
}

export function incrementFishPosition (fish, fishtank) {
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
  limitMovement(position, finalPos, 100 * FEM)
  const durations = {
    rotation: randomInt(500, 1000),
    movement: randomInt(2000, 4000)
  }
  const rotate = new TWEEN.Tween(position)
    .to({rotation: calculateAngle(position, finalPos)}, durations.rotation)
    .easing(TWEEN.Easing.Exponential.Out)
  const move = new TWEEN.Tween(position)
    .to({x: finalPos.x, y: finalPos.y}, durations.movement)
    .easing(TWEEN.Easing.Exponential.Out)
    .onComplete(() => {
      createMovement(position, fishtank)
    })
  rotate.chain(move).start()
}

function limitMovement (fromPos, toPos, maxDistance) {
  const distance = Math.hypot(toPos.y - fromPos.y, toPos.x - fromPos.y)
  if (distance > maxDistance) {
    toPos.y = fromPos.y + Math.floor((toPos.y - fromPos.y) * maxDistance / distance)
    toPos.x = fromPos.x + Math.floor((toPos.x - fromPos.x) * maxDistance / distance)
  }
}

function calculateAngle (fromPos, toPos) {
  const y = toPos.y - fromPos.y
  const x = toPos.x - fromPos.x
  return Math.floor((Math.atan2(y, x) / Math.PI) * 180)
}

