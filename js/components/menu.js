import { connect } from 'react-redux'
import { SHOW_CONSOLE, showConsole, HIDE_CONSOLE, hideConsole } from '../actions/console.js'
import { toggleMenu } from '../actions/menu.js'
import { ADD_FISH, addFish, REMOVE_FISH, removeFish, FINITE_TANK, finiteTank, INFINITE_TANK, infiniteTank } from '../actions/fishtank.js'
import { PLAY_ANIMATION, playAnimation, PAUSE_ANIMATION, pauseAnimation } from '../actions/animation.js'
import { get } from '../util/content.js'
import View from '../views/menu.js'

const add = Symbol('addAction')
const items = []
items[add] = (condition, type0, fn0, type1, fn1) => {
  let type, fn
  if (!fn0) {
    type = condition
    fn = type0
  } else if (condition) {
    type = type0
    fn = fn0
  } else {
    type = type1
    fn = fn1
  }
  items.push({action: fn, display: get(type, 'menu')})
}

const mapStateToProps = (state) => {
  items.length = 0
  items[add](ADD_FISH, addFish)
  if (state.fishtank.fish.length > 0) {
    items[add](REMOVE_FISH, removeFish)
    items[add](state.animation.playing, PAUSE_ANIMATION, pauseAnimation, PLAY_ANIMATION, playAnimation)
  }
  items[add](state.fishtank.infinite, FINITE_TANK, finiteTank, INFINITE_TANK, infiniteTank)
  items[add](state.console.visible, HIDE_CONSOLE, hideConsole, SHOW_CONSOLE, showConsole)
  return {
    visible: state.menu.visible,
    items: items
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fireAction: (action) => {
      dispatch(action())
      dispatch(toggleMenu())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View)
