import React from 'react'
import { get, languages } from '../util/content.js'

const renderIcon = (language) => {
  return <img key={language.key} src={language.icon} className='languageIcon'></img>
}
export default () => (
  <header>
  {languages().map(renderIcon)}
  {get('HEADER')}
  </header>
)
