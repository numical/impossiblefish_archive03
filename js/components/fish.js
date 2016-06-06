import { connect } from 'react-redux'
import View from '../views/fish.js'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    click: (konvaEvent) => {
      konvaEvent.evt.preventDefault() // stopPropagation()
      console.log('fish clicked ')
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View)
