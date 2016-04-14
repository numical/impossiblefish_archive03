import { TOGGLE_MENU } from '../constants/actions.js'

const initialState = {
  visible: true
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return Object.assign({}, state, { visible: !state.visible })
    default:
      return state
  }
}
