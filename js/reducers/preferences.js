import { CHANGE_LOCALE } from '../actions/preferences.js'

const initialState = {
  locale: 'en'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LOCALE:
      return { locale: action.locale }
    default:
      return state
  }
}
