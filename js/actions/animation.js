import { animateFish } from '../fish/behaviour.js'

export const ANIMATE = 'ANIMATE'
export const animate = (requestId) => ({type: ANIMATE, requestId: requestId})

export const PLAY_ANIMATION = 'PLAY_ANIMATION'
export const playAnimation = () => {
  return (dispatch, getState) => {
    if (getState().animation.playing) return
    const animation = () => {
      const requestId = window.requestAnimationFrame(animation)
      animateFish(getState().fishtank)
      dispatch(animate(requestId))
    }
    dispatch({type: PLAY_ANIMATION})
    animation()
  }
}

export const PAUSE_ANIMATION = 'PAUSE_ANIMATION'
export const pauseAnimation = () => {
  return (dispatch, getState) => {
    const {playing, requestId} = getState().animation
    if (!playing) return
    window.cancelAnimationFrame(requestId)
    dispatch({type: PAUSE_ANIMATION})
  }
}
