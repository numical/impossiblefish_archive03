import { PLAY_ANIMATION, PAUSE_ANIMATION, ANIMATE } from '../actions/animation.js'

const PAUSED_STATE = {
  playing: false
}
const PLAYING_STATE = {
  playing: true
}

export default (state = PAUSED_STATE, action) => {
  switch (action.type) {
    case ANIMATE:
      return Object.assign({}, state, {requestId: action.requestId})
    case PLAY_ANIMATION:
      return Object.assign({}, state, PLAYING_STATE)
    case PAUSE_ANIMATION:
      return Object.assign({}, state, PAUSED_STATE)
    default:
      return state
  }
}
