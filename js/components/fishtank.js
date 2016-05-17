import { connect } from 'react-redux'
import { toggleMenu, resizeTank } from '../constants/actions.js'
import View from '../views/fishtank.js'

const mapStateToProps = (state) => {
  return {
    fish: state.fishtank.fish,
    height: state.fishtank.size.height,
    width: state.fishtank.size.width,
    // we do not actually use this property but force a re-render when console property changes
    consoleVisible: state.console.visible
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    click: () => dispatch(toggleMenu()),
    resize: (width, height) => dispatch(resizeTank(width, height))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View)
