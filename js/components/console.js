import { displayToConsole, hideConsole } from '../actions/console.js'
import { addFish, removeFish, infiniteTank, finiteTank } from '../actions/fishtank.js'
import { playAnimation, pauseAnimation } from '../actions/animation.js'

import { get } from '../util/content.js'
import View from '../views/console.js'
import { connect } from 'react-redux'

const NOUNS = {
  CONSOLE: 'console',
  FISH: 'fish',
  TANK: 'tank'
}
const VERBS = {
  HELP: 'help',
  HIDE: 'hide',
  ADD: 'add',
  REMOVE: 'remove',
  PLAY: 'play',
  PAUSE: 'pause',
  INFINITE: 'infinite',
  FINITE: 'finite'
}
const DELIMITER = ' '
const NO_FISH = 'There are no fish to remove'

const mapStateToProps = (state) => {
  return Object.assign({}, state.console, {
    existingFish: state.fishtank.fish.length > 0,
    playing: state.animation.playing,
    infiniteTank: state.fishtank.infinite
  })
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
  dispatch(displayToConsole(get('CONSOLE_CURSOR') + command))
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
    case VERBS.PLAY:
      return playAnimation()
    case VERBS.PAUSE:
      return pauseAnimation()
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
    case NOUNS.TANK:
      return parseTankCommand(verb, props)
    default:
      return error()
  }
}

const error = () => {
  return displayToConsole(get('CONSOLE_INVALID_COMMAND'))
}

const buildHelpString = (props) => {
  const commands = []
  commands.push(VERBS.HELP)
  commands.push(VERBS.HIDE + DELIMITER + NOUNS.CONSOLE)
  commands.push(VERBS.ADD + DELIMITER + NOUNS.FISH)
  if (props.existingFish) {
    commands.push(VERBS.REMOVE + DELIMITER + NOUNS.FISH)
    if (props.playing) {
      commands.push(VERBS.PAUSE)
    } else {
      commands.push(VERBS.PLAY)
    }
  }
  if (props.infiniteTank) {
    commands.push(VERBS.FINITE + DELIMITER + NOUNS.TANK)
  } else {
    commands.push(VERBS.INFINITE + DELIMITER + NOUNS.TANK)
  }
  return get('CONSOLE_HELP_INTRO') + commands.join(get('CONSOLE_HELP_DELIMITER'))
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

const parseTankCommand = (verb, props) => {
  switch (verb) {
    case VERBS.FINITE:
      return finiteTank()
    case VERBS.INFINITE:
      return infiniteTank()
    default:
      return error()
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(View)

