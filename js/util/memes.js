'use strict'

import { randomFrom } from './random.js'

const MEMES = [
  'Don\'t panic',
  'Do. Or do not. There is no try.',
  'That\'s the thing about people who think they hate computers...What they really hate are lousy programmers.',
  'If you want me to treat your ideas with more respect, get some better ideas.',
  'Those who believe in telekinetics, raise my hand.',
  'Science is magic that works.',
  'The real sign of intelligence isn\'t knoweldge, it\'s imagination',
  'Forgive your enemies, but never forget their names.',
  'Not all things we don\'t see aren\'t there',
  'Don’t argue with idiots because they will drag you down to their level and then beat you with experience.'
]

export function randomMeme () {
  return randomFrom(MEMES)
}
