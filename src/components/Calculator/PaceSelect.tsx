import React from 'react'
import NumberSelect from './NumberSelect'
import './PaceSelect.scss'

export enum PaceFragment {
  Minutes = 'minutes',
  Seconds = 'seconds',
}

interface PaceSelectProps {
  label: string
  value: number
  onChange: (value: number) => void
}

interface Pace {
  [key: string]: number
}

export default class DurationSelect extends React.Component<PaceSelectProps, {}> {
  handleChange(prop: string, value: number) {
    const pace = this.toPace(this.props.value)
    pace[prop] = value
    this.props.onChange(this.toSeconds(pace))
  }

  toSeconds(pace: Pace): number {
    return pace[PaceFragment.Minutes] * 60 + pace[PaceFragment.Seconds]
  }

  toPace(seconds: number): Pace {
    return {
      [PaceFragment.Minutes]: Math.floor(seconds / 60),
      [PaceFragment.Seconds]: seconds % 60,
    }
  }

  render() {
    const pace = this.toPace(this.props.value)

    return (
      <div className="pace-select">
        <div className="pace-select__label">{this.props.label}</div>
        <div className="pace-select__input">
          <NumberSelect
            name={PaceFragment.Minutes}
            value={pace[PaceFragment.Minutes]}
            max="59"
            onChange={this.handleChange.bind(this, PaceFragment.Minutes)}
          />
          <span className="pace-select__separator">:</span>
          <NumberSelect
            name={PaceFragment.Seconds}
            value={pace[PaceFragment.Seconds]}
            max="59"
            pad="2"
            onChange={this.handleChange.bind(this, PaceFragment.Seconds)}
          />
          <span className="pace-select__value-label">min/km</span>
        </div>
      </div>
    )
  }
}
