import { changeLanguage } from '../util/content.js'

export const CHANGE_LOCALE = 'CHANGE_LOCALE'
export const changeLocale = (locale) => {
  return (dispatch) => {
    console.log(CHANGE_LOCALE + ' + ' + locale)
    changeLanguage(locale)
    dispatch({ type: CHANGE_LOCALE, locale: locale })
  }
}
