import { connect } from 'react-redux'
import { toggleConsole } from '../actions/console.js'
import { toggleMenu } from '../actions/menu.js'
import { addFish, removeFish } from '../actions/fishtank.js'
import { playAnimation, pauseAnimation } from '../actions/animation.js'
import View from '../views/menu.js'

const mapStateToProps = (state) => {
  const items = []
  items.push({
    display: 'Add Fish',
    action: addFish()
  })
  if (state.fishtank.fish.length > 0) {
    items.push({
      display: 'Remove Fish',
      action: removeFish()
    })
    if (state.animation.playing) {
      items.push({
        display: 'Pause',
        action: pauseAnimation()
      })
    } else {
      items.push({
        display: 'Play',
        action: playAnimation()
      })
    }
  }
  items.push({
    display: state.console.visible ? 'Hide Console' : 'Show Console',
    action: toggleConsole()
  })
  return {
    visible: state.menu.visible,
    items: items
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fireAction: (action) => {
      dispatch(action)
      dispatch(toggleMenu())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View)
