export const TOGGLE_CONSOLE = 'TOGGLE_CONSOLE'
export const toggleConsole = () => ({ type: TOGGLE_CONSOLE })

export const TOGGLE_MENU = 'TOOGLE_MENU'
export const toggleMenu = () => ({ type: TOGGLE_MENU })

export const DISPLAY_TO_CONSOLE = 'DISPLAY_TO_CONSOLE'
export const displayToConsole = (...lines) => ({ type: DISPLAY_TO_CONSOLE, lines: lines })

export const ADD_FISH = 'ADD_FISH'
export const addFish = () => {
  return (dispatch, getState) => {
    dispatch({type: ADD_FISH})
    if (getState().fishtank.fish.length === 1) {
      dispatch(playAnimation())
    }
  }
}

export const REMOVE_FISH = 'REMOVE_FISH'
export const removeFish = () => {
  return (dispatch, getState) => {
    dispatch({type: REMOVE_FISH})
    if (getState().fishtank.fish.length === 0) {
      dispatch(pauseAnimation())
    }
  }
}

export const RESIZE_TANK = 'RESIZE_TANK'
export const resizeTank = (width, height) => ({type: RESIZE_TANK, width: width, height: height})

export const ANIMATE = 'ANIMATE'
export const animate = (requestId) => ({type: ANIMATE, requestId: requestId})

export const PLAY_ANIMATION = 'PLAY_ANIMATION'
export const playAnimation = () => {
  return (dispatch, getState) => {
    if (getState().animation.playing) return
    const animation = () => {
      const requestId = window.requestAnimationFrame(animation)
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
