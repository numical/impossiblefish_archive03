import { connect } from 'react-redux';
import { displayToConsole, toggleConsole } from '../constants/actions.js'
import { CURSOR } from '../constants/console.js'
import View from '../views/console.js'

const INVALID_COMMAND = "Invalid command, type 'help'",
      HELP = "Available commands: help, hide console"

const processCommand = ( command , dispatch ) => {
  const elements = command.split(' '),
        error = () => dispatch( displayToConsole( CURSOR + command, INVALID_COMMAND ) )
 
  switch( elements.length ) {
    case 1:
      if ( 'help' === elements[0] ) {
        dispatch( displayToConsole( CURSOR + command, HELP ) )
      }  else {
        error()
      }
      break
    case 2:
      const verb = elements[0],
            noun = elements[1]
      if ( 'hide' === verb && 'console' === noun ){
        dispatch( toggleConsole() )
      }  else {
        error()
      }
      break
    default:
      error()
  }
}


const mapStateToProps = ( state ) => {
  return state.console
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    processCommand: (command) => processCommand( command, dispatch )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View)
