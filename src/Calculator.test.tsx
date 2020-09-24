import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import Calculator from './Calculator'

describe('render', () => {
  it('renders correctly', () => {
    const json = shallowToJson(shallow(<Calculator />))
    expect(json).toMatchSnapshot();
  })
})