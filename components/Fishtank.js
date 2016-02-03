import React from 'react';
import Menu from './Menu.js';
import { getCSSBoxInfo } from '../util/DOMUtil.js';

const Fishtank = React.createClass({

  getInitialState(){
    return {
      height: 0,
      width: 0
    }
  },

  autosizeCanvas(){
    if ( this.refs.fishtank ) {

      if ( this.state.width >= this.refs.fishtank.clientWidth ) {
        this.setState({ height: 0, width: 0 });
      }

      let box = this.state.box ?
                this.state.box :
                getCSSBoxInfo( this.refs.canvas ),
          height = this.refs.fishtank.clientHeight - box.vertical, 
          width = this.refs.fishtank.clientWidth - box.horizontal;
      this.setState( { height: height, width: width, box: box } );
    }
  },

  handleClick(){
    this.refs.menu.getDOMNode().style.display = 'block';
  },

  componentDidMount(){
    this.autosizeCanvas();
    window.addEventListener('resize', this.autosizeCanvas);
    window.addEventListener('orientationchange', this.autosizeCanvas);
  }, 

  componentWillUnmount(){
    window.removeEventListener('resize', this.autosizeCanvas);
    window.removeEventListener('orientationchange', this.autosizeCanvas);
  },
  
  render(){ return (
      <div id='fishtank' ref='fishtank'>
        <canvas ref='canvas' height={this.state.height} width={this.state.width} onClick={this.handleClick}>
          Sorry, your browser does not support fish tanks!
        </canvas>
        <Menu ref='menu'/>         
        <div id='water'/>
      </div>
   )} 
})

export default Fishtank;
