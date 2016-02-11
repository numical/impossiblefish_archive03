import React from 'react';
import Menu from '../components/menu.js'
import { getCSSBoxInfo } from '../util/DOMUtil.js';

const FILL_ANIMATION_DURATION = 2000

const FishtankView = React.createClass({

  getInitialState() {
    return { showWater: true }
  },

  calculateHeight() {
    if ( this.refs.fishtank ){
      return this.refs.fishtank.clientHeight - this.state.box.vertical 
    } else {
      return 0
    }
  },
      
  calculateWidth() {
    if ( this.refs.fishtank ) {
      return this.refs.fishtank.clientWidth - this.state.box.horizontal
    } else {
      return 0
    }
  },

  rerender() {
    if ( this.refs.canvas.width >= this.refs.fishtank.clientWidth ) {
     this.setState( this.state );
    }
    this.setState( this.state )
  },

  componentDidMount(){
    const box = getCSSBoxInfo( this.refs.canvas )
    this.setState( { box: box } )
    window.addEventListener('resize', this.rerender)
    window.addEventListener('orientationchange', this.rerender)
//    window.setTimeout( () => this.setState( { showWater:false } ), FILL_ANIMATION_DURATION )
  }, 

  componentWillUnmount(){
    window.removeEventListener('resize', this.rerender);
    window.removeEventListener('orientationchange', this.rerender);
  },

  render(){
    return (
      <div id='fishtank' ref='fishtank'>
        <canvas ref='canvas' height={this.calculateHeight()} width={this.calculateWidth()} onClick={this.props.click}>
          Sorry, your browser does not support fish tanks!
        </canvas>
        <Menu ref='menu'/>         
        {this.state.showWater ? <div id='water'/> : null}
      </div> ) 
  }
})

export default FishtankView
