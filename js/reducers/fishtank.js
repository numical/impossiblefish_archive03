const STARTUP_ANIMATION_DURATION = 2000

const initialState = {
  inStartupAnimation: true,
  startUpTime: Date.now()
}

export default ( state=initialState, action ) => {

  if ( state.inStartupAnimation && Date.now() - state.startUpTime > STARTUP_ANIMATION_DURATION ) {
    return Object.assign({},state,{inStartupAnimation: false})
  } else {
    return state;
  }
}
