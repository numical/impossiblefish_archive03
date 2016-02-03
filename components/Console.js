import React from 'react';

const Console = React.createClass({

  getInitialState(){
    return {
      history: {},
      current: "***Fishtank Console***"
    }
  },
  
  render(){ return (
    <div id='console' contentEditable={true}>{this.state.current}</div>
  )}
})

export default Console;
