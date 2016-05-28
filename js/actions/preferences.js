import { changeLanguage } from '../util/content.js'
import { toggleMenu } from './menu.js'

export const CHANGE_LOCALE = 'CHANGE_LOCALE'
export const changeLocale = (locale) => {
  return (dispatch) => {
    changeLanguage(locale)
    dispatch({ type: CHANGE_LOCALE, locale: locale })
    dispatch(toggleMenu())
  }
}
