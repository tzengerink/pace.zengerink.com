import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import App from './App'

describe('render', () => {
  it('renders correctly', () => {
    const json = shallowToJson(shallow(<App />))
    expect(json).toMatchSnapshot()
  })
})
