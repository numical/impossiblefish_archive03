'use strict'

import Counter from '../util/counter.js'
import { randomInt } from '../util/random.js'

const FISH_SCALE = 1
const FISH_UNIT = 6
const FISH_ID = new Counter()

export function newFish (fishtank) {
  return {
    id: FISH_ID.next(),
    x: randomInt(fishtank.size.width),
    y: randomInt(fishtank.size.height),
    rotation: 0,
    FEM: FISH_UNIT * FISH_SCALE
  }
}

export function incrementFishPosition (fish, fishtank) {
  return Object.assign({}, fish, {
    x: (fish.x >= fishtank.size.width) ? 0 : fish.x + fish.FEM,
    y: (fish.y >= fishtank.size.height) ? 0 : fish.y + fish.FEM / 2,
    rotation: (fish.rotation > 359) ? 0 : fish.rotation + 1
  })
}
