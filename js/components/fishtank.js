import { connect } from 'react-redux';
import { toggleMenu } from '../actions/actions.js'
import View from '../views/fishtank.js'

const mapStateToProps = ( state ) => {
  // we do not actually use this property but force  a re-render when console property changes
  return { 
    consoleVisible: state.console.visible
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
