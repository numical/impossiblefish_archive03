import { connect } from 'react-redux';
import { TOGGLE_MENU, toggleMenu } from '../actions/actions.js'
import View from '../views/fishtank.js'

const mapStateToProps = ( state ) => {
  return state.fishtank
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    clicked: () => dispatch( toggleMenu() )
 }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View)
