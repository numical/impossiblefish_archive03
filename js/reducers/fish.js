import { ADD_FISH, REMOVE_FISH } from '../constants/actions.js'

const initialState = {
  fish: []
}

export default ( state=initialState, action ) => {
  
  switch( action.type ) {
    case ADD_FISH:
      return Object.assign({},state,{ fish: addFish( state ) })
    case REMOVE_FISH:
      return Object.assign({},state,{ fish: removeFish( state ) })
    default:
      return state;
  }
}

const addFish = ( state ) => {
  return [ ...state.fish, {id: state.fish.length + 1 } ]
}

const removeFish = ( state ) => {
  return state.fish.slice(0,-1)
}
