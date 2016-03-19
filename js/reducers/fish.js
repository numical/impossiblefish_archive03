import { ADD_FISH, REMOVE_FISH } from '../constants/actions.js'

const initialState = {
  local: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_FISH:
      return Object.assign({}, state, { local: addFish(state) })
    case REMOVE_FISH:
      return Object.assign({}, state, { local: removeFish(state) })
    default:
      return state
  }
}

const addFish = (state) => {
  return [ ...state.local, { id: state.local.length + 1 } ]
}

const removeFish = (state) => {
  return state.local.slice(0, -1)
}
