'use strict'

import Counter from '../util/counter.js'
import { randomInt } from '../util/random.js'
import { randomMeme } from '../util/memes.js'
import TWEEN from 'tween.js'

const FISH_SCALE = 1
const FISH_UNIT = 6
const FEM = FISH_UNIT * FISH_SCALE
const FISH_ID = new Counter()
const ORIGIN = {x: 0, y: 0}

const FINITE_MODE = {
  incrementFishPosition: (fish) => {
    return Object.assign({}, fish, {
      x: fish.tweenPos.x,
      y: fish.tweenPos.y,
      rotation: fish.tweenPos.rotation
    })
  },
  createFishTween: (position, fishtank) => {
    const finalPos = {
      x: randomInt(fishtank.size.width),
      y: randomInt(fishtank.size.height)
    }
    FINITE_MODE.limitMovement(position, finalPos, 100 * FEM)
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
        FINITE_MODE.createFishTween(position, fishtank)
      })
    rotate.chain(move).start()
  },
  limitMovement: (fromPos, toPos, maxDistance) => {
    const distance = Math.hypot(toPos.y - fromPos.y, toPos.x - fromPos.y)
    if (distance > maxDistance) {
      toPos.y = fromPos.y + Math.floor((toPos.y - fromPos.y) * maxDistance / distance)
      toPos.x = fromPos.x + Math.floor((toPos.x - fromPos.x) * maxDistance / distance)
    }
  }
}

const INFINITE_MODE = {
  incrementFishPosition: (fish, fishtank) => {
    return Object.assign({}, fish, {
      x: INFINITE_MODE.ensureInBounds(fish.tweenPos.x, fishtank.size.width),
      y: INFINITE_MODE.ensureInBounds(fish.tweenPos.y, fishtank.size.height),
      rotation: fish.tweenPos.rotation
    })
  },
  ensureInBounds: (n, max) => {
    if (n < 0) {
      return n + max
    } else if (n > max) {
      return n - max
    } else {
      return n
    }
  },
  createFishTween: (position, fishtank) => {
    const delta = {
      x: randomInt(-fishtank.size.width / 2, fishtank.size.width / 2),
      y: randomInt(-fishtank.size.height / 2, fishtank.size.height / 2)
    }
    const deltaStrings = {
      x: delta.x >= 0 ? '+' + delta.x : '' + delta.x,
      y: delta.y >= 0 ? '+' + delta.y : '' + delta.y
    }
    const durations = {
      rotation: randomInt(500, 1000),
      movement: randomInt(2000, 4000)
    }
    const rotate = new TWEEN.Tween(position)
      .to({rotation: calculateAngle(delta)}, durations.rotation)
      .easing(TWEEN.Easing.Exponential.Out)
    const move = new TWEEN.Tween(position)
      .to(deltaStrings, durations.movement)
      .easing(TWEEN.Easing.Exponential.Out)
      .onComplete(() => {
        INFINITE_MODE.createFishTween(position, fishtank)
      })
    rotate.chain(move).start()
  }
}

const calculateAngle = (fromPos, toPos) => {
  if (!toPos) {
    toPos = fromPos
    fromPos = ORIGIN
  }
  const y = toPos.y - fromPos.y
  const x = toPos.x - fromPos.x
  return Math.floor((Math.atan2(y, x) / Math.PI) * 180)
}

export function newFish (fishtank) {
  return {
    id: FISH_ID.next(),
    x: randomInt(fishtank.size.width),
    y: randomInt(fishtank.size.height),
    rotation: 0,
    FEM: FEM,
    meme: randomMeme()
  }
}

export function incrementFishPosition (fish, fishtank) {
  if (!fish.tweenPos) return fish
  const mode = fishtank.infinite ? INFINITE_MODE : FINITE_MODE
  return mode.incrementFishPosition(fish, fishtank)
}

export function updateFishTweens (fishtank) {
  fishtank.fish.forEach((fish) => {
    if (!fish.tweenPos) {
      fish.tweenPos = {x: fish.x, y: fish.y, rotation: fish.rotation}
      const mode = fishtank.infinite ? INFINITE_MODE : FINITE_MODE
      mode.createFishTween(fish.tweenPos, fishtank)
    }
  })
  TWEEN.update()
}

export function removeFishTweens (fishtank) {
  TWEEN.removeAll()
  fishtank.fish.forEach((fish) => {
    delete fish.tweenPos
  })
}

