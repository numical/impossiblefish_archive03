import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import App from '../../js/views/app.js'

describe('<App />', function(){
  it("React container is present", function(){
    expect( (shallow(<App />).find('#react-content')).to.exist )
  })
})
