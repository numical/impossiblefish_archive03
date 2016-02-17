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

  dispatch( displayToConsole( CURSOR + command ) )

  const elements = command.trim().split( DELIMITER )
  switch( elements.length ) {
    case 1:
      dispatch( parseVerbOnlyCommand( elements[0] ) )
      break
    case 2:
      dispatch( parseVerbNounCommand( elements[0], elements[1] ) )
      break
    default:
      dispatch( error() )
  }
}

const error = () => {
  return displayToConsole( INVALID_COMMAND )
}

const parseVerbOnlyCommand = ( verb ) => {
  switch( verb ) {
    case 'help':
      return displayToConsole(  HELP )
    default:
      return error()
  }
}

const parseVerbNounCommand = ( verb, noun ) => {
  switch( noun ){
    case 'console':
      return parseConsoleCommand( verb )
    case 'fish':
      return parseFishCommand( verb )
    default:
      return error()
  }
}

const parseConsoleCommand = ( verb ) => {
  switch( verb ){
    case 'hide':
      return toggleConsole()
    default:
      return error()
  }
}

const parseFishCommand = ( verb ) => {
  switch( verb ){
    case 'add':
      return addFish()
    case 'remove':
      return removeFish()
    default:
      return error()
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View)
