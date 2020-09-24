import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import Calculator from './Calculator'

let wrapper: ShallowWrapper;

describe('Calculator', () => {
  beforeEach(() => {
    wrapper = shallow(<Calculator />)
  })

  it('renders', () => {
    expect(wrapper).not.toBeNull()
  })
})
