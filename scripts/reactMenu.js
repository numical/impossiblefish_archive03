import * as React from 'react';

export function init( gui ){
 
  const Menu = React.createClass( createMenu() );
  React.render( <Menu/>, gui.menu );
}

function createMenu(){
  return {
    render: () => {
      console.log("rendering menu");
      return (
        <ul>
          <li>Add Fish</li>
          <li>Connect</li>
          <li>Show Console</li>
        </ul>
      );
    }
  }
}
