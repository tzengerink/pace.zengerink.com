import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import DurationSelect from './DurationSelect'

describe('render', () => {
  it('renders correctly', () => {
    const onChange = jest.fn()
    const wrapper = shallow(<DurationSelect label="Time" value={3661} onChange={onChange} />)
    const json = shallowToJson(wrapper)
    expect(json).toMatchSnapshot()
  })
})

describe('onChange', () => {
  const testHandleChange = (name: string, newValue: number, expectedArgument: number) => {
    const onChange = jest.fn()
    const wrapper = shallow(<DurationSelect label="Time" value={0} onChange={onChange} />)
    const select = wrapper.find(`[name="${name}"]`)
    expect(select.length).toBe(1)

    select.simulate('change', newValue)
    expect(onChange.mock.calls.length).toBe(1)
    expect(onChange.mock.calls[0][0]).toBe(expectedArgument)
  }

  it('is called when one of the selects changes', () => {
    testHandleChange('hours', 1, 3600)
    testHandleChange('minutes', 2, 120)
    testHandleChange('seconds', 3, 3)
  })
})
