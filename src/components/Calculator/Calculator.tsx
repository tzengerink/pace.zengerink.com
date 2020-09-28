import React from 'react'
import DurationSelect from './DurationSelect'
import DistanceSelect from './DistanceSelect'
import PaceSelect from './PaceSelect'
import './Calculator.scss'

export enum CalculatorValue {
  DurationInSeconds = 'seconds',
  DistanceInMeters = 'meters',
  PaceInSeconds = 'pace',
}

interface CalculatorState {
  seconds: number
  meters: number
  pace: number
  changed: CalculatorValue[]
}

export default class Calculator extends React.Component<{}, CalculatorState> {
  constructor(props: any) {
    super(props)

    this.state = {
      [CalculatorValue.DurationInSeconds]: 0,
      [CalculatorValue.DistanceInMeters]: 0,
      [CalculatorValue.PaceInSeconds]: 0,
      changed: [],
    }
  }

  calculateDistance(duration: number, pace: number): number {
    const durationInMinutes = duration / 60
    const paceInMinutes = pace / 60
    const paceInKilometers = durationInMinutes / paceInMinutes
    return paceInKilometers * 1000
  }

  calculateDuration(distance: number, pace: number): number {
    const distanceInKilometers = distance / 1000
    const paceInMinutes = pace / 60
    const durationInMinutes = distanceInKilometers * paceInMinutes
    return durationInMinutes * 60
  }

  calculatePace(duration: number, distance: number): number {
    const distanceInKilometers = distance / 1000
    const durationInMinutes = duration / 60
    const paceInMinutes = durationInMinutes / distanceInKilometers
    return Math.round(paceInMinutes * 60)
  }

  calculateStateProp(state: CalculatorState, prop: CalculatorValue, calc: () => number): CalculatorState {
    if (state[prop] === 0 || !state.changed.find((item) => item === prop)) {
      const value = calc()
      state[prop] = Number.isFinite(value) ? value : 0
    }
    return state
  }

  handleChange(prop: CalculatorValue, value: number) {
    this.setState((prevState) => {
      let nextState = {
        [CalculatorValue.DurationInSeconds]: prevState[CalculatorValue.DurationInSeconds],
        [CalculatorValue.DistanceInMeters]: prevState[CalculatorValue.DistanceInMeters],
        [CalculatorValue.PaceInSeconds]: prevState[CalculatorValue.PaceInSeconds],
        changed: prevState.changed,
      }
      nextState[prop] = value

      // Push current item to the `changed` list, only keep two recent items
      if (!prevState.changed.some((item) => item === prop)) {
        if (nextState.changed.push(prop) > 2) {
          nextState.changed.shift()
        }
      }

      nextState = this.calculateStateProp(nextState, CalculatorValue.DurationInSeconds, () => {
        return this.calculateDuration(
          nextState[CalculatorValue.DistanceInMeters],
          nextState[CalculatorValue.PaceInSeconds]
        )
      })

      nextState = this.calculateStateProp(nextState, CalculatorValue.DistanceInMeters, () => {
        return this.calculateDistance(
          nextState[CalculatorValue.DurationInSeconds],
          nextState[CalculatorValue.PaceInSeconds]
        )
      })

      nextState = this.calculateStateProp(nextState, CalculatorValue.PaceInSeconds, () => {
        return this.calculatePace(
          nextState[CalculatorValue.DurationInSeconds],
          nextState[CalculatorValue.DistanceInMeters]
        )
      })

      return nextState
    })
  }

  render() {
    return (
      <div className="calculator">
        <div className="calculator__header">Pace Calculator</div>
        <DurationSelect
          label="Time"
          value={this.state[CalculatorValue.DurationInSeconds]}
          onChange={this.handleChange.bind(this, CalculatorValue.DurationInSeconds)}
        />
        <DistanceSelect
          label="Distance"
          value={this.state[CalculatorValue.DistanceInMeters]}
          onChange={this.handleChange.bind(this, CalculatorValue.DistanceInMeters)}
        />
        <PaceSelect
          label="Pace"
          value={this.state[CalculatorValue.PaceInSeconds]}
          onChange={this.handleChange.bind(this, CalculatorValue.PaceInSeconds)}
        />
      </div>
    )
  }
}
