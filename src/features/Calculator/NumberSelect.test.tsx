import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import NumberSelect from './NumberSelect'

describe('render', () => {
  it('renders correctly', () => {
    const onChange = jest.fn()
    const wrapper = shallow(<NumberSelect name="test" value={0} max="3" onChange={onChange} />)
    const json = shallowToJson(wrapper)
    expect(json).toMatchSnapshot()
  })

  it('renders padded values correctly', () => {
    const onChange = jest.fn()
    const wrapper = shallow(<NumberSelect name="test" value={0} max="3" pad="2" onChange={onChange} />)
    const json = shallowToJson(wrapper)
    expect(json).toMatchSnapshot()
  })
})

describe('onChange', () => {
  it('is called when changed', () => {
    const onChange = jest.fn()
    const wrapper = shallow(<NumberSelect name="test" value={0} max="3" onChange={onChange} />)
    const value = 3
    const option = wrapper.find(`[data-value=${value}]`)
    const event = { currentTarget: { getAttribute: () => value } }
    option.simulate('click', event)
    expect(onChange.mock.calls.length).toBe(1)
    expect(onChange.mock.calls[0][0]).toBe(value)
  })
})
