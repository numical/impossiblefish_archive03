import { connect } from 'react-redux'
import { toggleConsole, toggleMenu, addFish, removeFish } from '../constants/actions.js'
import View from '../views/menu.js'

const mapStateToProps = (state) => {
  const items = []
  items.push({
    display: 'Add Fish',
    action: addFish()
  })
  if (state.fish.local.length > 0) {
    items.push({
      display: 'Remove Fish',
      action: removeFish()
    })
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
