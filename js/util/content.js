'use strict'

const LANGUAGES = [
  {
    key: 'en',
    icon: require('./../../i18n/en/flag.png'),
    content: require('./../../i18n/en/content.js').default
  },
  {
    key: 'de',
    icon: require('./../../i18n/de/flag.png'),
    content: require('./../../i18n/de/content.js').default
  }
]

let language = LANGUAGES[0]

export function languages () { return LANGUAGES }

export function get (key, subkey) {
  let value = language.content[key]
  if (!value) return `Missing content for key '${key}'`
  if (subkey) {
    value = value[subkey]
    if (!value) return `Missing content for key '${key}' and subkey '${subkey}'`
  }
  return value
}

export function has (key, subkey) {
  let value = language.content[key]
  if (!value) return false
  if (subkey) {
    value = value[subkey]
    if (!value) false
  }
  return true
}
