import { TOGGLE_CONSOLE, DISPLAY_TO_CONSOLE } from '../actions/actions.js'


const initialState = {
  visible: false,
  history: ["***Fishtank Console***","type 'help' for available commands"]
}

export default ( state=initialState, action ) => {
  
  switch( action.type ) {
    case TOGGLE_CONSOLE:
      return Object.assign({},state,{ visible: !state.visible })
    case DISPLAY_TO_CONSOLE: 
      const newHistory = state.history.concat( action.lines )
      return Object.assign({},state,{ history: newHistory })
    default:
      return state;
  }
}
