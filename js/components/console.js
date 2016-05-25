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

class Command {
  constructor (command, action, isApplicable, ...subcommands) {
    this.command = command
    this.action = action
    this.applicable = isApplicable || function () {return true}
    this.subcommands = subcommands
    this.isLeaf = !this.subcommands
  }
  isApplicable (props) {
    return true
  }
}

const commands = [
  new Command(
    'help', 
    (props) => {displayToConsole(buildHelpString(props))}
  ),
  new Command(
    'hide', 
    null,
    null,
    new Command(
      'console',
      hideConsole
    )
  ),
  new Command(
    'add',
    null,
    null,
    new Command(
      'fish',
      addFish
    )
  ),
  new Command(
    'remove',
    null,
    null,
    new Command(
      'fish',
      removeFish,
      (props) => props.existingFish
    )
  ),
  new Command(
    'pause',
    pauseAnimation,
    (props) => props.playing
  ),
  new Command(
    'play',
    playAnimation,
    (props) => !props.playing
  ),
  new Command(
    'finite',
    null,
    null,
    new Command(
      'tank',
      finiteTank,
      (props) => props.infiniteTank
    )
  ),
  new Command(
    'infinite',
    null,
    null,
    new Command(
      'tank',
      infiniteTank,
      (props) => !props.infiniteTank
    )
  )
]



export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(View)
