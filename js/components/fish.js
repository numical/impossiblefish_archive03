import { connect } from 'react-redux'
import View from '../views/fish.js'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    click: () => console.log('fish clicked')
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View)
