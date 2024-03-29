'use strict'

class Language {
  constructor (locale) {
    this.locale = locale
    this.flag = require('./../../i18n/' + locale + '/flag.png')
    this.content = require('./../../i18n/' + locale + '/content.js').default
  }
}

const LANGUAGES = {
  en: new Language('en'),
  de: new Language('de')
}

let currentLanguage = LANGUAGES.en

export function languages () { return Object.values(LANGUAGES) }

export function changeLanguage (locale) {
  currentLanguage = LANGUAGES[locale]
}

export function get (key, subkey, tokens) {
  if (!tokens && typeof subkey === 'object') {
    tokens = subkey
    subkey = null
  }
  let value = currentLanguage.content[key]
  if (!value) return `Missing content for key '${key}'`
  if (subkey) {
    value = value[subkey]
    if (!value) return `Missing content for key '${key}' and subkey '${subkey}'`
  }
  if (tokens) {
    value = parse(value, tokens)
  }
  return value
}

export function has (key, subkey) {
  let value = currentLanguage.content[key]
  if (!value) return false
  if (subkey) {
    value = value[subkey]
    if (!value) false
  }
  return true
}

function parse (templateExpression, tokens) {
  for (var token in tokens) {
    templateExpression = templateExpression.replace('{' + token + '}', tokens[token])
  }
  return templateExpression
}
