import { playAnimation, pauseAnimation } from './animation.js'

export const ADD_FISH = 'ADD_FISH'
export const addFish = () => {
  return (dispatch, getState) => {
    dispatch({type: ADD_FISH, display: 'Fish added'})
    if (getState().fishtank.fish.length === 1) {
      dispatch(playAnimation())
    }
  }
}

export const REMOVE_FISH = 'REMOVE_FISH'
export const removeFish = () => {
  return (dispatch, getState) => {
    dispatch({type: REMOVE_FISH, display: 'Fish removed'})
    if (getState().fishtank.fish.length === 0) {
      dispatch(pauseAnimation())
    }
  }
}

export const RESIZE_TANK = 'RESIZE_TANK'
export const resizeTank = (width, height) => ({type: RESIZE_TANK, width: width, height: height})

