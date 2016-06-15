import { ADD_FISH, REMOVE_FISH, UPDATE_FISH, RESIZE_TANK, INFINITE_TANK, FINITE_TANK } from '../actions/fishtank.js'
import { ANIMATE, PLAY_FISH, PAUSE_FISH } from '../actions/animation.js'
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
  const updateFn = selectFishUpdateFn(action)
  if (updateFn) {
    return Object.assign({}, state, {fish: updateFn(state)})
  }
  const changedState = selectChangedState(action)
  if (changedState) {
    return Object.assign({}, state, changedState)
  }
  return state
}

const selectFishUpdateFn = (action) => {
  switch (action.type) {
    case ANIMATE:
      return moveAllFish
    case ADD_FISH:
      return addNewFish
    case REMOVE_FISH:
      return removeFirstFish
    case PLAY_FISH:
      return updateSingleFishAnimation.bind(null, action.id, {active: true})
    case PAUSE_FISH:
      return updateSingleFishAnimation.bind(null, action.id, {active: false})
    case UPDATE_FISH:
      return updateSingleFish.bind(null, action.id, action.changedState)
    default:
      return
  }
}

const selectChangedState = (action) => {
  switch (action.type) {
    case RESIZE_TANK:
      return {size: {width: action.width, height: action.height}}
    case INFINITE_TANK:
      return {mode: FishTankModes.INFINITE_TANK}
    case FINITE_TANK:
      return {mode: FishTankModes.FINITE_TANK}
    default:
      return
  }
}

const moveAllFish = (fishtank) => {
  return fishtank.fish.map((fish) => {
    return fish.animation.active
      ? fishtank.mode.incrementFishPosition(fish, fishtank)
      : fish
  })
}

const addNewFish = (fishtank) => {
  const newFish = {
    id: FISH_ID.next(),
    FEM: FEM,
    pos: {
      x: randomInt(fishtank.size.width),
      y: randomInt(fishtank.size.height),
      rotation: 0
    },
    meme: randomMeme(),
    animation: {
      pos: null,
      tween: null,
      active: true
    }
  }
  return [...fishtank.fish, newFish]
}

const removeFirstFish = (fishtank) => {
  return fishtank.fish.slice(0, -1)
}

const updateSingleFishAnimation = (id, changedState, fishtank) => {
  const fish = fishtank.fish.find((fish) => fish.id === id)
  const animation = Object.assign({}, fish.animation, changedState)
  return updateSingleFish(id, {animation: animation}, fishtank)
}

const updateSingleFish = (id, changedState, fishtank) => {
  return fishtank.fish.map((fish) => {
    return (fish.id === id) ? Object.assign({}, fish, changedState) : fish
  })
}
