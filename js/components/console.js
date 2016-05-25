import { displayToConsole, hideConsole } from '../actions/console.js'
import { addFish, removeFish } from '../actions/fishtank.js'
import { get } from '../util/content.js'
import View from '../views/console.js'
import { connect } from 'react-redux'

const NOUNS = {
  CONSOLE: 'console',
  FISH: 'fish'
}
const VERBS = {
  HELP: 'help',
  HIDE: 'hide',
  ADD: 'add',
  REMOVE: 'remove'
}

const CURSOR = get('CONSOLE_CURSOR')
const INVALID_COMMAND = get('CONSOLE_INVALID_COMMAND')
const DELIMITER = ' '
const HELP = 'Available commands: help, hide console, add/remove fish'
const HELP_NO_FISH = 'Available commands: help, hide console, add fish'
const NO_FISH = 'There are no fish to remove'

const mapStateToProps = (state) => {
  return Object.assign({}, state.console, { existingFish: state.fishtank.fish.length > 0 })
}

// framework would do this by default - but this is more explicit
const mapDispatchToProps = (dispatch) => {
  return {dispatch: dispatch}
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const mergedProps = Object.assign({}, ownProps, stateProps)
  const stateAwareDispatchProps = {
    processCommand: (command) => parseCommand(command, dispatchProps.dispatch, mergedProps)
  }
  return Object.assign({}, mergedProps, stateAwareDispatchProps)
}

const parseCommand = (command, dispatch, props) => {
  dispatch(displayToConsole(CURSOR + command))
  const elements = command.trim().split(DELIMITER)
  switch (elements.length) {
    case 1:
      dispatch(parseVerbOnlyCommand(elements[0], props))
      break
    case 2:
      dispatch(parseVerbNounCommand(elements[0], elements[1], props))
      break
    default:
      dispatch(error())
  }
}

const parseVerbOnlyCommand = (verb, props) => {
  switch (verb) {
    case VERBS.HELP:
      return displayToConsole(buildHelpString(props))
    default:
      return error()
  }
}

const parseVerbNounCommand = (verb, noun, props) => {
  switch (noun) {
    case NOUNS.CONSOLE:
      return parseConsoleCommand(verb)
    case NOUNS.FISH:
      return parseFishCommand(verb, props)
    default:
      return error()
  }
}

const error = () => {
  return displayToConsole(INVALID_COMMAND)
}

const buildHelpString = (props) => {
  return props.existingFish ? HELP : HELP_NO_FISH
}

const parseConsoleCommand = (verb) => {
  switch (verb) {
    case VERBS.HIDE:
      return hideConsole()
    default:
      return error()
  }
}

const parseFishCommand = (verb, props) => {
  switch (verb) {
    case VERBS.ADD:
      return addFish()
    case VERBS.REMOVE:
      return props.existingFish ? removeFish() : displayToConsole(NO_FISH)
    default:
      return error()
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(View)
