import React from 'react'
import NumberSelect from './NumberSelect'

export enum PaceFragment {
  Minutes = 'minutes',
  Seconds = 'seconds',
}

interface PaceSelectProps {
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
      <div className="duration-select">
        <NumberSelect
          name={PaceFragment.Minutes}
          value={pace[PaceFragment.Minutes]}
          max="59"
          onChange={this.handleChange.bind(this, PaceFragment.Minutes)}
        />
        <span>:</span>
        <NumberSelect
          name={PaceFragment.Seconds}
          value={pace[PaceFragment.Seconds]}
          max="59"
          pad="2"
          onChange={this.handleChange.bind(this, PaceFragment.Seconds)}
        />
        <span>min/km</span>
      </div>
    )
  }
}
