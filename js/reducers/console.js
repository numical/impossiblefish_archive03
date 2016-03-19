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
      return Object.assign({}, state, { history: displayToConsole(state, action) })
    case ADD_FISH:
      return Object.assign({}, state, { history: addFish(state, action) })
    case REMOVE_FISH:
      return Object.assign({}, state, { history: removeFish(state, action) })
    default:
      return state
  }
}

const displayToConsole = (state, action) => {
  return state.history.concat(action.lines)
}

const addFish = (state, action) => {
  return state.history.concat(['Fish added'])
}

const removeFish = (state, action) => {
  return state.history.concat(['Fish removed'])
}
