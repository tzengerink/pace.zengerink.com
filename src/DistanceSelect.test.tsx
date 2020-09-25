import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import DistanceSelect, { DistanceFragment } from './DistanceSelect'


describe('render', () => {
  it('renders correctly', () => {
    const onChange = jest.fn()
    const wrapper = shallow(<DistanceSelect value={3661} onChange={onChange} />)
    const json = shallowToJson(wrapper)
    expect(json).toMatchSnapshot()
  })
})

describe('onChange', () => {
  function testOnChange(name: string, newValue: number, expectedArgument: number) {
    const onChange = jest.fn()
    const wrapper = shallow(<DistanceSelect value={0} onChange={onChange} />)
    const select = wrapper.find(`[name="${name}"]`)
    expect(select.length).toBe(1)

    select.simulate('change', newValue)
    expect(onChange.mock.calls.length).toBe(1)
    expect(onChange.mock.calls[0][0]).toBe(expectedArgument)
  }

  it('is called when one of the selects changes', () => {
    testOnChange(DistanceFragment.Kilometers, 1, 1000)
    testOnChange(DistanceFragment.Meters, 2, 2)
  })
})