import { ADD_FISH, REMOVE_FISH, ANIMATE } from '../constants/actions.js'

const FISH_UNIT = 6
const FISH_SCALE = 1

const initialState = {
  fish: [],
  size: {
    x: 1200,
    y: 600
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_FISH:
      return updateFishState(state, addFish)
    case REMOVE_FISH:
      return updateFishState(state, removeFish)
    case ANIMATE:
      return (state.fish.length === 0)
             ? state
             : updateFishState(state, animateFish)
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

const newFish = (fishtank) => ({
  id: fishtank.fish.length + 1,
  x: 100,
  y: 100,
  rotation: 0,
  FEM: FISH_UNIT * FISH_SCALE
})

const removeFish = (fishtank) => {
  return fishtank.fish.slice(0, -1)
}

const animateFish = (fishtank) => {
  return fishtank.fish.map((fish) => {
    return Object.assign({}, fish, {
      x: (fish.x >= fishtank.size.x) ? 0 : fish.x + fish.FEM,
      y: (fish.y >= fishtank.size.y) ? 0 : fish.y + fish.FEM / 2,
      rotation: (fish.rotation > 359) ? 0 : fish.rotation + 1
    })
  })
}
