import '../src/setup'
import React from 'react'
import { expect } from 'chai'
import { shallow, mount, render } from 'enzyme' // eslint-disable-line
import FileSystem from '../src/FileSystem'

describe('A suite', function() {
  it('contains spec with an expectation', function() {
    expect(shallow(<FileSystem />).contains(<div className="foo" />)).to.equal(true)
  })

  it('contains spec with an expectation', function() {
    expect(shallow(<FileSystem />).is('.foo')).to.equal(true)
  })

  it('contains spec with an expectation', function() {
    expect(mount(<FileSystem />).find('.foo').length).to.equal(1)
  })
})
