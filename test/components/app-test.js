import 'babel-polyfill'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { expect } from 'chai'
import app from '../../js/components/app.js'

describe('app starts', () => {

  it("React container is present", () => {

    let element = TestUtils.renderIntoDocument( app() )

    expect( TestUtils.isCompositeComponent( element ) ).to.be.true

  })

})
