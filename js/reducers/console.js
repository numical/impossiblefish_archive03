import { TOGGLE_CONSOLE } from '../actions/actions.js'


const initialState = {
  visible: false, 
  history: ["***Fishtank Console***","type 'help' for available commands"]
}

export default ( state=initialState, action ) => {
  
  switch( action.type ) {
    case TOGGLE_CONSOLE:
      return Object.assign({},state,{ visible: !state.visible })
    default:
      return state;
  }
}
