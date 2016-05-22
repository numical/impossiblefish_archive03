'use strict'

import Counter from '../util/counter.js'
import { randomInt } from '../util/random.js'
import TWEEN from 'tween.js'

const FISH_SCALE = 1
const FISH_UNIT = 6
const FISH_ID = new Counter()

export function newFish (fishtank) {
  const pos = {x: 0, y: 0}
  new TWEEN.Tween(pos)
    .to({x: fishtank.size.width, y: fishtank.size.height}, 3000)
    .easing(TWEEN.Easing.Exponential.Out)
    .repeat(Infinity)
    .yoyo(true)
    .start()
  return {
    id: FISH_ID.next(),
    pos: pos,
    rotation: 45,
    FEM: FISH_UNIT * FISH_SCALE
  }
}

export function incrementFishPosition (fish, fishtank) {
  /*
  return Object.assign({}, fish, {
    x: (fish.x >= fishtank.size.width) ? 0 : fish.x + fish.FEM,
    y: (fish.y >= fishtank.size.height) ? 0 : fish.y + fish.FEM / 2,
    rotation: (fish.rotation > 359) ? 0 : fish.rotation + 1
  })
  */
  TWEEN.update()
  return Object.assign({}, fish)
}
