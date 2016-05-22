'use strict'

// to be replaced with seedrandom for 'recording' randomness soon...
const random = Math.random

export function randomInt (min, max) {
  if (!max) {
    max = min
    min = 0
  }
  return Math.floor(random() * (max + 1 - min) + min)
}
