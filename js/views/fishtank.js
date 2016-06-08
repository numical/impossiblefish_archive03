import React from 'react'
import { findDOMNode } from 'react-dom'
import { Stage, Layer } from 'react-konva'
import { getCSSBoxInfo, getFirstChildWithTag } from '../util/DOMHacks.js'
import Fish from '../components/fish.js'

const FISHTANK = 'fishtank'
const CANVAS_CONTAINER = 'canvas'
const CANVAS_CONTAINER_STYLE = {background: '#E0EEEE'}
const CANVAS_CONTAINER_CLASS = 'tankBorder'
const CANVAS_TAG = 'CANVAS'
const RESIZE_EVENTS = ['resize', 'orientationchange']

export default React.createClass({

  componentDidMount () {
    // click listener
    // 2 Konva issues here
    // - cannot add content events in <Stage />
    // - have to manually check for bubble cancel
    this.refs[CANVAS_CONTAINER].node.on('contentClick', (konvaEvent) => {
      if (!konvaEvent.evt.cancelBubble) {
        this.props.click()
      }
    })

    // resize canvas to size of screen
    const canvasContainer = findDOMNode(this.refs[CANVAS_CONTAINER])
    const state = {
      box: getCSSBoxInfo(canvasContainer),
      canvas: getFirstChildWithTag(canvasContainer, CANVAS_TAG)
    }
    const autoResize = () => {
      this.resize()
      RESIZE_EVENTS.forEach((event) => {
        window.addEventListener(event, this.resize)
      })
    }
    this.setState(state, autoResize)
  },

  componentWillUnmount () {
    RESIZE_EVENTS.forEach((event) => {
      window.removeEventListener(event, this.resize)
    })
  },

  resize () {
    if (this.state.canvas.width >= this.props.width | this.state.canvas.height >= this.props.height) {
      const width = this.refs[FISHTANK].clientWidth - this.state.box.horizontal
      const height = this.refs[FISHTANK].clientHeight - this.state.box.vertical
      this.props.resize(width, height)
    }
  },

  // this is here to cause a resize instead of a render if the console is added/removed
  shouldComponentUpdate (nextProps) {
    if (nextProps.console === this.props.console) {
      return true
    } else {
      this.resize() // note the dispatched action is async
      return false
    }
  },

  render () {
    return (
      <div id={FISHTANK} ref={FISHTANK}>
        <Stage
          ref={CANVAS_CONTAINER}
          className={CANVAS_CONTAINER_CLASS}
          style={CANVAS_CONTAINER_STYLE}
          height={this.props.height}
          width={this.props.width}>
          <Layer>
            {this.props.fish.map((fish) => <Fish key={fish.id} model={fish}/>)}
          </Layer>
        </Stage>
      </div>)
  }
})
