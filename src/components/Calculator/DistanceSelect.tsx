import React from 'react'
import NumberSelect from './NumberSelect'
import './DistanceSelect.scss'

export enum DistanceFragment {
  Kilometers = 'km',
  Meters = 'm',
}

interface DistanceSelectProps {
  label: string
  value: number
  onChange: (value: number) => void
}

interface Distance {
  [key: string]: number
}

export default class DurationSelect extends React.Component<DistanceSelectProps, {}> {
  handleChange(prop: string, value: number) {
    const distance = this.toDistance(this.props.value)
    distance[prop] = value
    this.props.onChange(this.toMeters(distance))
  }

  toMeters(distance: Distance): number {
    return distance[DistanceFragment.Kilometers] * 1000 + distance[DistanceFragment.Meters]
  }

  toDistance(meters: number): Distance {
    return {
      [DistanceFragment.Kilometers]: Math.floor(meters / 1000),
      [DistanceFragment.Meters]: meters % 1000,
    }
  }

  render() {
    const distance = this.toDistance(this.props.value)

    return (
      <div className="distance-select">
        <div className="distance-select__label">{this.props.label}</div>
        <div className="distance-select__input">
          <NumberSelect
            name={DistanceFragment.Kilometers}
            value={distance[DistanceFragment.Kilometers]}
            max="100"
            onChange={this.handleChange.bind(this, DistanceFragment.Kilometers)}
          />
          <span className="distance-select__separator">.</span>
          <NumberSelect
            name={DistanceFragment.Meters}
            value={distance[DistanceFragment.Meters]}
            max="999"
            pad="3"
            onChange={this.handleChange.bind(this, DistanceFragment.Meters)}
          />
          <span className="distance-select__value-label">km</span>
        </div>
      </div>
    )
  }
}
