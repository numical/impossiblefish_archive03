import { connect } from 'react-redux'
import { toggleConsole, toggleMenu } from '../constants/actions.js'
import View from '../views/menu.js'


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
    fireAction: (action) => {
      dispatch( action )
      dispatch( toggleMenu() )
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View)

