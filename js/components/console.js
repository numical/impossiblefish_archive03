import { displayToConsole, toggleConsole, addFish, removeFish } from '../constants/actions.js'
import { CURSOR } from '../constants/console.js'
import View from '../views/console.js'
import { connect } from 'react-redux';

const DELIMITER = ' ',
      INVALID_COMMAND = "Invalid command, type 'help'",
      HELP =  "Available commands: help, hide console, add/remove fish",
      HELP_NO_FISH = "Available commands: help, hide console, add fish",
      NO_FISH = "There are no fish to remove"


const mapStateToProps = ( state ) => {
  return Object.assign( {}, state.console, { existingFish: state.fish.local.length > 0 } )
}

// framework would do this by default - but this is more explicit
const mapDispatchToProps = ( dispatch ) => {
  return { dispatch: dispatch }
}

const mergeProps = ( stateProps, dispatchProps, ownProps ) => {
  const mergedProps = Object.assign( {}, ownProps, stateProps ),
        stateAwareDispatchProps = {
          processCommand: (command) => parseCommand( command, dispatchProps.dispatch, mergedProps )
        }
  return Object.assign( {}, mergedProps, stateAwareDispatchProps )
}

const parseCommand = ( command , dispatch, props ) => {

  dispatch( displayToConsole( CURSOR + command ) )

  const elements = command.trim().split( DELIMITER )
  switch( elements.length ) {
    case 1:
      dispatch( parseVerbOnlyCommand( elements[0], props ) )
      break
    case 2:
      dispatch( parseVerbNounCommand( elements[0], elements[1], props ) )
      break
    default:
      dispatch( error() )
  }
}

const parseVerbOnlyCommand = ( verb, props ) => {
  switch( verb ) {
    case 'help':
      return displayToConsole(  buildHelpString( props ) )
    default:
      return error()
  }
}

const parseVerbNounCommand = ( verb, noun, props ) => {
  switch( noun ){
    case 'console':
      return parseConsoleCommand( verb )
    case 'fish':
      return parseFishCommand( verb, props )
    default:
      return error()
  }
}

const error = () => {
  return displayToConsole( INVALID_COMMAND )
}

const buildHelpString = ( props ) => {
  return props.existingFish? HELP : HELP_NO_FISH
}

const parseConsoleCommand = ( verb ) => {
  switch( verb ){
    case 'hide':
      return toggleConsole()
    default:
      return error()
  }
}

const parseFishCommand = ( verb, props ) => {
  switch( verb ){
    case 'add':
      return addFish()
    case 'remove':
      return props.existingFish ? removeFish() : displayToConsole( NO_FISH )
    default:
      return error()
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(View)
