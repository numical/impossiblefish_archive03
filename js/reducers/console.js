import { SHOW_CONSOLE, HIDE_CONSOLE, DISPLAY_TO_CONSOLE } from '../actions/console.js'
import { has, get } from '../util/content.js'

const initialState = {
  visible: false,
  history: get('CONSOLE_INTRODUCTION')
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_CONSOLE:
      return Object.assign({}, state, { visible: true })
    case HIDE_CONSOLE:
      return Object.assign({}, state, { visible: false })
    case DISPLAY_TO_CONSOLE:
      return addToStateHistory(state, action.lines)
    default:
      return has(action.type, 'console') ? addToStateHistory(state, get(action.type, 'console')) : state
  }
}

const addToStateHistory = (state, lines) => {
  return Object.assign({}, state, { history: state.history.concat(lines) })
}
