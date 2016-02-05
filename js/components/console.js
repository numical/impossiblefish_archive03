import { connect } from 'react-redux';
import View from '../views/console.js'

const mapStateToProps = ( state ) => {
  return state.console
}

const mapDispatchToProps = ( dispatch ) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View)