import { connect } from 'react-redux'
import { toggleConsole } from '../actions/actions.js'
import View from './MenuView.js'


const mapStateToProps = ( state ) => {
  
  const items = [];

  // toggle console visibility
  items.push( {
    display: state.console.visible? "Hide Console" : "Show Console",
    action: toggleConsole()
  });

  return {
    visible: state.menu.visible,
    items: items
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    fireAction: (action) => dispatch( action )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View)

