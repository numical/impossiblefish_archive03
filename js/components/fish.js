import { connect } from 'react-redux'
import { displayToConsole } from '../actions/console.js'
import { get } from '../util/content.js'
import View from '../views/fish.js'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    click: (fish) => {
      dispatch(displayToConsole(get('FISH_MESSAGE', fish)))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View)
