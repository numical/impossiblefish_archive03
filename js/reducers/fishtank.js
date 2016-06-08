import { ADD_FISH, REMOVE_FISH, RESIZE_TANK, INFINITE_TANK, FINITE_TANK } from '../actions/fishtank.js'
import { ANIMATE } from '../actions/animation.js'
import { randomInt } from '../util/random.js'
import { randomMeme } from '../util/memes.js'
import Counter from '../util/counter.js'
import FishTankModes from '../util/fishtankmode.js'

const FISH_SCALE = 1
const FISH_UNIT = 6
const FEM = FISH_UNIT * FISH_SCALE
const FISH_ID = new Counter()

const initialState = {
  fish: [],
  size: {
    width: 0,
    height: 0
  },
  mode: FishTankModes.FINITE_TANK
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_FISH:
      return updateFishState(state, addNewFish)
    case REMOVE_FISH:
      return updateFishState(state, removeFirstFish)
    case RESIZE_TANK:
      return updateTankState(state, {size: {width: action.width, height: action.height}})
    case ANIMATE:
      return updateFishState(state, moveAllFish)
    case INFINITE_TANK:
      return updateTankState(state, {mode: FishTankModes.INFINITE_TANK})
    case FINITE_TANK:
      return updateTankState(state, {mode: FishTankModes.FINITE_TANK})
    default:
      return state
  }
}

const updateTankState = (state, updatedValues) => {
  return Object.assign({}, state, updatedValues)
}

const updateFishState = (state, updateFn) => {
  return Object.assign({}, state, {fish: updateFn(state)})
}

const addNewFish = (fishtank) => {
  const newFish = {
    id: FISH_ID.next(),
    x: randomInt(fishtank.size.width),
    y: randomInt(fishtank.size.height),
    rotation: 0,
    FEM: FEM,
    meme: randomMeme()
  }
  return [...fishtank.fish, newFish]
}

const removeFirstFish = (fishtank) => {
  return fishtank.fish.slice(0, -1)
}

const moveAllFish = (fishtank) => {
  return fishtank.fish.map((fish) => {
    if (!fish.tweenPos) return fish
    return fishtank.mode.incrementFishPosition(fish, fishtank)
  })
}
