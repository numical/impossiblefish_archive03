import React from 'react'
import { get, languages } from '../util/content.js'

const HeaderView = React.createClass({

  render () {
    return (
      <header>
        <div className='flags'>
          {languages().map(this.renderFlag)}
        </div>
        <div className='headerText'>
          {get('HEADER')}
        </div>
      </header>
    )
  },

  renderFlag (language) {
    return <img
      key={language.locale}
      src={language.flag}
      onClick={this.props.onFlagClick.bind(null, language.locale)}
      className='flag'>
    </img>
  }
})

export default HeaderView
