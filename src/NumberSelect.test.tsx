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
    const select = wrapper.find('[name="test"]')
    const value = 1
    const event = {currentTarget: {value: value.toString()}} as React.ChangeEvent<HTMLSelectElement>
    select.simulate('change', event)
    expect(onChange.mock.calls.length).toBe(1)
  })
})