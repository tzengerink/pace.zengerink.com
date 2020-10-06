import React from 'react'
import { mount, ReactWrapper, shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import { act } from 'react-dom/test-utils'
import Calculator from './Calculator'

const duration = 600 // 10 min
const distance = 2000 // 2 km
const pace = 300 // 5 min/km

const change = (wrapper: ReactWrapper, label: string, value: number): ReactWrapper => {
  act(() => {
    wrapper.find(`[label="${label}"]`).props().onChange!(value as any)
  })
  return wrapper.update()
}

const validate = (wrapper: ReactWrapper, label: string, value: number) => {
  expect(wrapper.find(`[label="${label}"]`).props().value).toBe(value)
}

describe('render', () => {
  it('renders correctly', () => {
    const json = shallowToJson(shallow(<Calculator />))
    expect(json).toMatchSnapshot()
  })
})

describe('calculate', () => {
  it('calculates pace when duration and distance have been set', () => {
    let wrapper = mount(<Calculator />)

    wrapper = change(wrapper, 'Time', duration)
    wrapper = change(wrapper, 'Distance', distance)

    validate(wrapper, 'Time', duration)
    validate(wrapper, 'Distance', distance)
    validate(wrapper, 'Pace', pace)
  })

  it('calculates duration when distance and pace have been set', () => {
    let wrapper = mount(<Calculator />)

    wrapper = change(wrapper, 'Distance', distance)
    wrapper = change(wrapper, 'Pace', pace)

    validate(wrapper, 'Time', duration)
    validate(wrapper, 'Distance', distance)
    validate(wrapper, 'Pace', pace)
  })

  it('calculates distance when duration and pace have been set', () => {
    let wrapper = mount(<Calculator />)

    wrapper = change(wrapper, 'Time', duration)
    wrapper = change(wrapper, 'Pace', pace)

    validate(wrapper, 'Time', duration)
    validate(wrapper, 'Distance', distance)
    validate(wrapper, 'Pace', pace)
  })

  it('calculates the value of the last unchanged select', () => {
    let wrapper = mount(<Calculator />)

    wrapper = change(wrapper, 'Time', duration)
    wrapper = change(wrapper, 'Distance', distance)
    wrapper = change(wrapper, 'Pace', pace)

    validate(wrapper, 'Time', duration)
    validate(wrapper, 'Distance', distance)
    validate(wrapper, 'Pace', pace)

    const anotherDuration = 300 // 5 min
    const anotherDistance = 5000 // 5 km
    const anotherPace = 60 // 1 min/km

    wrapper = change(wrapper, 'Time', anotherDuration)
    wrapper = change(wrapper, 'Pace', anotherPace)

    validate(wrapper, 'Time', anotherDuration)
    validate(wrapper, 'Distance', anotherDistance)
    validate(wrapper, 'Pace', anotherPace)
  })

  it('does not trigger any calculation when same select is changed twice', () => {
    let wrapper = mount(<Calculator />)

    wrapper = change(wrapper, 'Time', 3600) // 1 hour
    wrapper = change(wrapper, 'Time', 3660) // 1 hour and 1 minute

    validate(wrapper, 'Time', 3660)
    validate(wrapper, 'Distance', 0)
    validate(wrapper, 'Pace', 0)
  })
})

describe('clear', () => {
  it('clears the values when clicked', () => {
    let wrapper = mount(<Calculator />)

    validate(wrapper, 'Time', 0)
    validate(wrapper, 'Distance', 0)
    validate(wrapper, 'Pace', 0)

    wrapper = change(wrapper, 'Time', duration)
    wrapper = change(wrapper, 'Distance', distance)

    validate(wrapper, 'Time', duration)
    validate(wrapper, 'Distance', distance)

    act(() => {
      wrapper.find('button').simulate('click')
    })
    wrapper.update()

    validate(wrapper, 'Time', 0)
    validate(wrapper, 'Distance', 0)
    validate(wrapper, 'Pace', 0)
  })
})
