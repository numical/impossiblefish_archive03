import { TOGGLE_CONSOLE, DISPLAY_TO_CONSOLE, ADD_FISH, REMOVE_FISH } from '../constants/actions.js'

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
    case ADD_FISH:
      return addToStateHistory(state, ['Fish added'])
    case REMOVE_FISH:
      return addToStateHistory(state, ['Fish removed'])
    default:
      return state
  }
}

const addToStateHistory = (state, lines) => {
  return Object.assign({}, state, { history: state.history.concat(lines) })
}
