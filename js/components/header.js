import { connect } from 'react-redux'
import { changeLocale } from '../actions/preferences.js'
import View from '../views/header.js'

const mapStateToProps = (state) => {
  return {
    locale: state.preferences.locale
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFlagClick: (locale) => dispatch(changeLocale(locale))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View)
