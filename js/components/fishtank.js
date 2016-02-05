import { connect } from 'react-redux';
import { toggleMenu } from '../actions/actions.js'
import View from '../views/fishtank.js'

const mapStateToProps = ( state ) => {
  return { 
    consoleVisible: state.console.visible,
    inStartupAnimation: state.fishtank.inStartupAnimation                                       
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    click: () => dispatch( toggleMenu() )
 }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View)
