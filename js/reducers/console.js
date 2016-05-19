import { TOGGLE_CONSOLE, DISPLAY_TO_CONSOLE } from '../actions/console.js'

const initialState = {
  visible: false,
  history: ['***Fishtank Console***', "type 'help' for available commands"]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_CONSOLE:
      return Object.assign({}, state, { visible: !state.visible })
    case DISPLAY_TO_CONSOLE:
      return addToStateHistory(state, action.lines)
    default:
      return (action.display) ? addToStateHistory(state, [action.display]) : state
  }
}

const addToStateHistory = (state, lines) => {
  return Object.assign({}, state, { history: state.history.concat(lines) })
}
