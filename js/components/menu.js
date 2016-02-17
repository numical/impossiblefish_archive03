import { connect } from 'react-redux'
import { toggleConsole, toggleMenu, addFish } from '../constants/actions.js'
import View from '../views/menu.js'


const mapStateToProps = ( state ) => {
  
  const items = [
    // add fish
    { display: 'Add Fish',
      action: addFish() },
    // toggle console visibility
    {  display: state.console.visible? "Hide Console" : "Show Console",
       action: toggleConsole() }
  ]

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

