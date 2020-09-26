import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import Calculator, { CalculatorValue } from './Calculator'

describe('render', () => {
  it('renders correctly', () => {
    const json = shallowToJson(shallow(<Calculator />))
    expect(json).toMatchSnapshot()
  })
})

describe('handleChange', () => {
  const testValues = {
    [CalculatorValue.DurationInSeconds]: 600, // 10 min
    [CalculatorValue.DistanceInMeters]: 2000, // 2 km
    [CalculatorValue.PaceInSeconds]: 300 // 5 min/km
  }

  it('calculates pace when duration and distance have been set', () => {
    const wrapper = shallow(<Calculator />)
    const instance = wrapper.instance() as Calculator
    instance.handleChange(CalculatorValue.DurationInSeconds, testValues[CalculatorValue.DurationInSeconds])
    instance.handleChange(CalculatorValue.DistanceInMeters, testValues[CalculatorValue.DistanceInMeters])

    expect(wrapper.state()).toEqual({
      changed: [CalculatorValue.DurationInSeconds, CalculatorValue.DistanceInMeters],
      [CalculatorValue.DurationInSeconds]: testValues[CalculatorValue.DurationInSeconds],
      [CalculatorValue.DistanceInMeters]: testValues[CalculatorValue.DistanceInMeters],
      [CalculatorValue.PaceInSeconds]: testValues[CalculatorValue.PaceInSeconds],
    })
  })

  it('calculates duration when distance and pace have been set', () => {
    const wrapper = shallow(<Calculator />)
    const instance = wrapper.instance() as Calculator
    instance.handleChange(CalculatorValue.DistanceInMeters, testValues[CalculatorValue.DistanceInMeters])
    instance.handleChange(CalculatorValue.PaceInSeconds, testValues[CalculatorValue.PaceInSeconds])

    expect(wrapper.state()).toEqual({
      changed: [CalculatorValue.DistanceInMeters, CalculatorValue.PaceInSeconds],
      [CalculatorValue.DurationInSeconds]: testValues[CalculatorValue.DurationInSeconds],
      [CalculatorValue.DistanceInMeters]: testValues[CalculatorValue.DistanceInMeters],
      [CalculatorValue.PaceInSeconds]: testValues[CalculatorValue.PaceInSeconds],
    })
  })

  it('calculates distance when duration and pace have been set', () => {
    const wrapper = shallow(<Calculator />)
    const instance = wrapper.instance() as Calculator
    instance.handleChange(CalculatorValue.DurationInSeconds, testValues[CalculatorValue.DurationInSeconds])
    instance.handleChange(CalculatorValue.PaceInSeconds, testValues[CalculatorValue.PaceInSeconds])

    expect(wrapper.state()).toEqual({
      changed: [CalculatorValue.DurationInSeconds, CalculatorValue.PaceInSeconds],
      [CalculatorValue.DurationInSeconds]: testValues[CalculatorValue.DurationInSeconds],
      [CalculatorValue.DistanceInMeters]: testValues[CalculatorValue.DistanceInMeters],
      [CalculatorValue.PaceInSeconds]: testValues[CalculatorValue.PaceInSeconds],
    })
  })

  it('stores the last two changed selects', () => {
    const wrapper = shallow(<Calculator />)
    const instance = wrapper.instance() as Calculator

    instance.handleChange(CalculatorValue.DurationInSeconds, testValues[CalculatorValue.DurationInSeconds])
    expect(wrapper.state()).toMatchObject({changed: [CalculatorValue.DurationInSeconds]})

    instance.handleChange(CalculatorValue.DistanceInMeters, testValues[CalculatorValue.DistanceInMeters])
    expect(wrapper.state()).toMatchObject({changed: [CalculatorValue.DurationInSeconds, CalculatorValue.DistanceInMeters]})

    instance.handleChange(CalculatorValue.PaceInSeconds, testValues[CalculatorValue.PaceInSeconds])
    expect(wrapper.state()).toMatchObject({changed: [CalculatorValue.DistanceInMeters, CalculatorValue.PaceInSeconds]})
  })

  it('calculates the value of the last unchanged select', () => {
    const wrapper = shallow(<Calculator />)
    const instance = wrapper.instance() as Calculator

    instance.handleChange(CalculatorValue.DurationInSeconds, testValues[CalculatorValue.DurationInSeconds])
    instance.handleChange(CalculatorValue.DistanceInMeters, testValues[CalculatorValue.DistanceInMeters])
    instance.handleChange(CalculatorValue.PaceInSeconds, testValues[CalculatorValue.PaceInSeconds])

    expect(wrapper.state()).toMatchObject({
      [CalculatorValue.DurationInSeconds]: testValues[CalculatorValue.DurationInSeconds],
      [CalculatorValue.DistanceInMeters]: testValues[CalculatorValue.DistanceInMeters],
      [CalculatorValue.PaceInSeconds]: testValues[CalculatorValue.PaceInSeconds],
    })

    const values = {
      [CalculatorValue.DurationInSeconds]: 300, // 5 min
      [CalculatorValue.DistanceInMeters]: 5000, // 5 km
      [CalculatorValue.PaceInSeconds]: 60 // 1 min/km
    }

    instance.handleChange(CalculatorValue.DurationInSeconds, values[CalculatorValue.DurationInSeconds])
    instance.handleChange(CalculatorValue.PaceInSeconds, values[CalculatorValue.PaceInSeconds])

    expect(wrapper.state()).toMatchObject({
      [CalculatorValue.DurationInSeconds]: values[CalculatorValue.DurationInSeconds],
      [CalculatorValue.DistanceInMeters]: values[CalculatorValue.DistanceInMeters],
      [CalculatorValue.PaceInSeconds]: values[CalculatorValue.PaceInSeconds]
    })
  })
})