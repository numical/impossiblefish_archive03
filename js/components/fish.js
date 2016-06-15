import { connect } from 'react-redux'
import { playFish, pauseFish } from '../actions/animation.js'
import { displayToConsole } from '../actions/console.js'
import { get } from '../util/content.js'
import View from '../views/fish.js'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    click: (fish) => {
      dispatch(fish.animation.active ? pauseFish(fish.id) : playFish(fish.id))
      dispatch(displayToConsole(get('FISH_MESSAGE', fish)))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View)
