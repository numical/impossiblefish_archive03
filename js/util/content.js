'use strict'

import CONTENT from './content_en.js'

export function get (key, subkey) {
  let value = CONTENT[key]
  if (!value) return `Missing content for key '${key}'`
  if (subkey) {
    value = value[subkey]
    if (!value) return `Missing content for key '${key}' and subkey '${subkey}'`
  }
  return value
}

export function has (key, subkey) {
  let value = CONTENT[key]
  if (!value) return false
  if (subkey) {
    value = value[subkey]
    if (!value) false
  }
  return true
}
