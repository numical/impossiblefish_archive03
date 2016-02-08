import React from 'react'

const MenuView = React.createClass({
  render(){ return (
      <div id='menu' style={this.getStyle()}>
        <ul>
          { this.props.items.map( (item) => {
             return <li key={item.display} onClick={() => this.props.fireAction(item.action)}>{item.display}</li> 
            } )
          } 
        </ul>
      </div>
    )
  },

  getStyle(){
    return {
      display: this.props.visible? 'block' : 'none' 
    }
  }
})

export default MenuView
