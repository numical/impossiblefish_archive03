import TWEEN from 'tween.js'

export const ANIMATE = 'ANIMATE'
export const animate = (requestId) => ({type: ANIMATE, requestId: requestId})

export const PLAY_ANIMATION = 'PLAY_ANIMATION'
export const playAnimation = () => {
  return (dispatch, getState) => {
    if (getState().animation.playing) return
    const animation = () => {
      const requestId = window.requestAnimationFrame(animation)
      updateFishTweens(getState().fishtank)
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

export const RESET_ANIMATION = 'RESET_ANIMATION'
export const resetAnimation = () => {
  return (dispatch, getState) => {
    removeFishTweens(getState().fishtank)
  }
}

function updateFishTweens (fishtank) {
  fishtank.fish.forEach((fish) => {
    if (!fish.tweenPos) {
      fish.tweenPos = {x: fish.x, y: fish.y, rotation: fish.rotation}
      fishtank.mode.createFishTween(fish.tweenPos, fishtank)
    }
  })
  TWEEN.update()
}

function removeFishTweens (fishtank) {
  TWEEN.removeAll()
  fishtank.fish.forEach((fish) => {
    delete fish.tweenPos
  })
}

