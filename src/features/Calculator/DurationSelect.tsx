import React from 'react'
import NumberSelect from './NumberSelect'
import './DurationSelect.scss'

export enum DurationFragment {
  Hours = 'hours',
  Minutes = 'minutes',
  Seconds = 'seconds',
}

interface DurationSelectProps {
  label: string
  value: number
  onChange: (value: number) => void
}

interface Duration {
  [key: string]: number
}

export default class DurationSelect extends React.Component<DurationSelectProps, {}> {
  handleChange(prop: string, value: number) {
    const duration = this.toDuration(this.props.value)
    duration[prop] = value
    this.props.onChange(this.toSeconds(duration))
  }

  toSeconds(duration: Duration): number {
    const hours = duration[DurationFragment.Hours] * 3600
    const minutes = duration[DurationFragment.Minutes] * 60

    return hours + minutes + duration[DurationFragment.Seconds]
  }

  toDuration(seconds: number): Duration {
    const date = new Date(seconds * 1000)

    return {
      [DurationFragment.Hours]: date.getUTCHours(),
      [DurationFragment.Minutes]: date.getUTCMinutes(),
      [DurationFragment.Seconds]: date.getSeconds(),
    }
  }

  render() {
    const duration = this.toDuration(this.props.value)

    return (
      <div className="duration-select">
        <div className="duration-select__label">{this.props.label}</div>
        <div className="duration-select__input">
          <NumberSelect
            name={DurationFragment.Hours}
            value={duration[DurationFragment.Hours]}
            max="23"
            onChange={this.handleChange.bind(this, DurationFragment.Hours)}
          />
          <span className="duration-select__value-label">hrs</span>
          <NumberSelect
            name={DurationFragment.Minutes}
            value={duration[DurationFragment.Minutes]}
            max="59"
            pad="2"
            onChange={this.handleChange.bind(this, DurationFragment.Minutes)}
          />
          <span className="duration-select__value-label">min</span>
          <NumberSelect
            name={DurationFragment.Seconds}
            value={duration[DurationFragment.Seconds]}
            max="59"
            pad="2"
            onChange={this.handleChange.bind(this, DurationFragment.Seconds)}
          />
          <span className="duration-select__value-label">sec</span>
        </div>
      </div>
    )
  }
}
