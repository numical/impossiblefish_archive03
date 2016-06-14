import TWEEN from 'tween.js'
import { updateFish } from './fishtank.js'

export const ANIMATE = 'ANIMATE'
export const animate = (requestId) => ({type: ANIMATE, requestId: requestId})

export const PLAY_ANIMATION = 'PLAY_ANIMATION'
export const playAnimation = () => {
  return (dispatch, getState) => {
    if (getState().animation.playing) return
    const animation = () => {
      const requestId = window.requestAnimationFrame(animation)
      updateFishTweens(dispatch, getState().fishtank)
      dispatch(animate(requestId))
    }
    dispatch({type: PLAY_ANIMATION})
    animation()
  }
}

function updateFishTweens (dispatch, fishtank) {
  fishtank.fish.forEach((fish) => {
    if (fish.animation.active) {
      if (!fish.animation.tween) {
        const pos = Object.assign({}, fish.pos)
        const animation = Object.assign({}, fish.animation, {
          tween: fishtank.mode.createFishTween(pos, fishtank),
          pos: pos
        })
        dispatch(updateFish(fish.id, {animation: animation}))
      }
    }
  })
  TWEEN.update()
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

export const RESET_ANIMATION = 'RESET_ANIMATION'
export const resetAnimation = () => {
  return (dispatch, getState) => {
    TWEEN.removeAll()
    getState().fishtank.fish.forEach((fish) => {
      const animation = Object.assign({}, fish.animation, {tween: null, pos: null})
      dispatch(updateFish(fish.id, {animation: animation}))
    })
  }
}

export const PLAY_FISH = 'PLAY_FISH'
export const playFish = (id) => {
  return (dispatch, getState) => {
    const fish = getState().fishtank.fish.filter((fish) => fish.id === id)
    if (fish && !fish.animation.active) {
      TWEEN.add(fish.animation.tween)
      dispatch({type: PLAY_FISH})
    }
  }
}

export const PAUSE_FISH = 'PAUSE_FISH'
export const pauseFish = (id) => {
  return (dispatch, getState) => {
    const fish = getState().fishtank.fish.filter((fish) => fish.id === id)
    if (fish && fish.animation.active) {
      TWEEN.remove(fish.animation.tween)
      dispatch({type: PAUSE_FISH})
    }
  }
}
