'use strict'

// to be replaced with seedrandom for 'recording' randomness soon...
const random = Math.random

// note: max inclusive
export function randomInt (min, max) {
  if (!max) {
    max = min
    min = 0
  }
  return Math.floor(random() * (max + 1 - min) + min)
}

export function randomFractionOf (intValue, minFraction) {
  const min = minFraction ? Math.floor(minFraction * intValue) : 0
  return randomInt(min, intValue)
}

export function randomBoolean () {
  return random() < 0.5
}
