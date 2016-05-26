import { displayToConsole, hideConsole } from '../actions/console.js'
import { addFish, removeFish, infiniteTank, finiteTank } from '../actions/fishtank.js'
import { playAnimation, pauseAnimation } from '../actions/animation.js'

import { get } from '../util/content.js'
import View from '../views/console.js'
import { connect } from 'react-redux'

class Command {
  constructor (text, action, isApplicable, ...subcommands) {
    this.text = text
    this.action = action
    this.isApplicable = isApplicable || (() => true)
    this.subcommands = subcommands
  }
  isLeaf () {
    return this.subcommands.length === 0
  }
}

const DELIMITER = ' '
const COMMANDS = [
  new Command('help', (props) => displayToConsole(helpOptions(props))),
  new Command('hide', null, null,
    new Command('console', hideConsole)
  ),
  new Command('add', null, null,
    new Command('fish', addFish)
  ),
  new Command('remove', null, null,
    new Command('fish', removeFish, (props) => props.fish)
  ),
  new Command('pause', pauseAnimation, (props) => props.fish && props.playing),
  new Command('play', playAnimation, (props) => props.fish && !props.playing),
  new Command('finite', null, null,
    new Command('tank', finiteTank, (props) => props.fish && props.infiniteTank)
  ),
  new Command('infinite', null, null,
    new Command('tank', infiniteTank, (props) => props.fish && !props.infiniteTank)
  )
]

const helpOptions = (props) => {
  const options = getApplicableCommands(COMMANDS, props)
  return get('CONSOLE_HELP_INTRO') + options.sort().join(get('CONSOLE_HELP_DELIMITER'))
}

const getApplicableCommands = (commands, props) => {
  return commands
    .filter((command) => command.isApplicable(props))
    .reduce((options, command) => {
      if (command.isLeaf()) {
        options.push(command.text)
      } else {
        const subcommands = getApplicableCommands(command.subcommands, props)
          .map((subcommand) => command.text + DELIMITER + subcommand)
        options.push(...subcommands)
      }
      return options
    }, [])
}

const parseCommand = (text, dispatch, props) => {
  dispatch(displayToConsole(get('CONSOLE_CURSOR') + text))
  const command = text.trim().split(DELIMITER).reduce((commands, text) => {
    const found = findCommand(text, commands, props)
    if (!found) {
      return undefined
    } else if (found.isLeaf()) {
      return found
    } else {
      return found.subcommands
    }
  }, COMMANDS)
  if (command) {
    dispatch(command.action(props)) // props only used by help action
  } else {
    dispatch(displayToConsole(get('CONSOLE_INVALID_COMMAND')))
  }
}

const findCommand = (text, commands, props) => {
  return commands
    .filter((command) => command.isApplicable(props))
    .find((command) => command.text === text)
}

const mapStateToProps = (state) => {
  return Object.assign({}, state.console, {
    fish: state.fishtank.fish.length > 0,
    playing: state.animation.playing,
    infiniteTank: state.fishtank.infinite
  })
}

const mapDispatchToProps = (dispatch) => {
  // framework would do this by default - but this is more explicit
  return {dispatch: dispatch}
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const mergedProps = Object.assign({}, ownProps, stateProps)
  const stateAwareDispatchProps = {
    processCommand: (text) => parseCommand(text, dispatchProps.dispatch, mergedProps)
  }
  return Object.assign({}, mergedProps, stateAwareDispatchProps)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(View)
