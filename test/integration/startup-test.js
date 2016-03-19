/*global describe before it */

import 'babel-polyfill'
import 'react'
import TestUtils from 'react-addons-test-utils'
import { expect } from 'chai'
import app from '../../js/components/app.js'

describe('Startup', () => {
  let root
  before(() => {
    root = TestUtils.renderIntoDocument(app())
  })
  it('React container is present', () => {
    expect(TestUtils.isCompositeComponent(root)).to.be.true
  })
  it('Canvas is present', () => {
    expect(TestUtils.findRenderedDOMComponentWithTag(root, 'canvas')).to.exist
  })
})
