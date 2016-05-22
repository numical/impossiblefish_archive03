import { ADD_FISH, REMOVE_FISH, RESIZE_TANK } from '../actions/fishtank.js'
import { ANIMATE } from '../actions/animation.js'
import { newFish, incrementFishPosition } from '../fish/behaviour.js'

const initialState = {
  fish: [],
  size: {
    width: 0,
    height: 0
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_FISH:
      return updateFishState(state, addFish)
    case REMOVE_FISH:
      return updateFishState(state, removeFish)
    case RESIZE_TANK:
      return Object.assign({}, state, {size: {width: action.width, height: action.height}})
    case ANIMATE:
      return updateFishState(state, animateFish)
    default:
      return state
  }
}

const updateFishState = (state, updateFn) => {
  return Object.assign({}, state, {fish: updateFn(state)})
}

const addFish = (fishtank) => {
  return [ ...fishtank.fish, newFish(fishtank) ]
}

const removeFish = (fishtank) => {
  return fishtank.fish.slice(0, -1)
}

const animateFish = (fishtank) => {
  return fishtank.fish.map((fish) => {
    return incrementFishPosition(fish, fishtank)
  })
}
