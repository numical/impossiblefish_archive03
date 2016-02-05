import { TOGGLE_CONSOLE } from '../actions/actions.js'


const initialState = {
}


export default ( state=initialState, action ) => {
  
  switch( action.type ) {
    case TOGGLE_CONSOLE:
      return Object.assign({},state )
    default:
      return state;
  }
}
