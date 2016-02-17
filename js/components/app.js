import { connect } from 'react-redux';
// import { toggleMenu } from '../constants/actions.js'
import View from '../views/app.js'

const mapStateToProps = ( state ) => {
  return state
}

const mapDispatchToProps = ( dispatch ) => {
  return {
 }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View)
