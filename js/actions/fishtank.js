import { playAnimation, pauseAnimation, resetAnimation } from './animation.js'

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
export const resizeTank = (width, height) => {
  // an async dispatch as this is called within shouldComponentUpdate() of FishtankView
  return (dispatch) => {
    dispatch(resetAnimation())
    dispatch({type: RESIZE_TANK, width: width, height: height})
  }
}

export const INFINITE_TANK = 'INFINITE_TANK'
export const infiniteTank = () => {
  return (dispatch) => {
    dispatch(resetAnimation())
    dispatch({type: INFINITE_TANK})
  }
}

export const FINITE_TANK = 'FINITE_TANK'
export const finiteTank = () => {
  return (dispatch) => {
    dispatch(resetAnimation())
    dispatch({type: FINITE_TANK})
  }
}
