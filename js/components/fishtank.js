import { connect } from 'react-redux'
import { toggleMenu } from '../actions/menu.js'
import { resizeTank } from '../actions/fishtank.js'
import View from '../views/fishtank.js'

const mapStateToProps = (state) => {
  return {
    fish: state.fishtank.fish,
    height: state.fishtank.size.height,
    width: state.fishtank.size.width
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
