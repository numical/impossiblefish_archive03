import React from 'react';

const ConsoleView = React.createClass({

  render(){
    return (
      <div id='console' 
           contentEditable={true}
           style={this.getStyle()}>
        {this.props.current}
      </div>
    )
  },

  getStyle(){
    return {
      display: this.props.visible ? 'block' : 'none'
    }
  }
})

export default ConsoleView
