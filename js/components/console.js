import { connect } from 'react-redux';
import { displayToConsole, toggleConsole, addFish, removeFish } from '../constants/actions.js'
import { CURSOR } from '../constants/console.js'
import View from '../views/console.js'

const DELIMITER = ' ',
      INVALID_COMMAND = "Invalid command, type 'help'",
      HELP = "Available commands: help, hide console, add/remove fish"

const mapStateToProps = ( state ) => {
  return state.console
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    processCommand: (command) => parseCommand( command, dispatch )
  }
}

const parseCommand = ( command , dispatch ) => {

  const elements = command.trim().split( DELIMITER ),
        error = () => dispatch( displayToConsole( INVALID_COMMAND ) )

  dispatch( displayToConsole( CURSOR + command ) )

  switch( elements.length ) {
    case 1:
      dispatch( parseVerbOnlyCommand( elements[0] ) )
      break
    case 2:
      dispatch( parseVerbNounCommand( elements[0], elements[1] ) )
      break
    default:
      error()
  }
}

const parseVerbOnlyCommand = ( verb ) => {
  switch( verb ) {
    case 'help':
      return displayToConsole(  HELP )
    default:
      error()
  }
}

const parseVerbNounCommand = ( verb, noun ) => {
  switch( noun ){
    case 'console':
      return parseConsoleCommand( verb )
    case 'fish':
      return parseFishCommand( verb )
    default:
      error()
  }
}

const parseConsoleCommand = ( verb ) => {
  switch( verb ){
    case 'hide':
      return toggleConsole()
    default:
      error()
  }
}

const parseFishCommand = ( verb ) => {
  switch( verb ){
    case 'add':
      return addFish()
    case 'remove':
      return removeFish()
    default:
      error()
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View)
