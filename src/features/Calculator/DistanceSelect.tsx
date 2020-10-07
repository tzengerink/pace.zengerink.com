import React, { ReactElement } from 'react'
import NumberSelect from './NumberSelect'
import './DistanceSelect.scss'

type DistanceFragmentName = 'km' | 'm'

interface DistanceFragments {
  km: number
  m: number
}

interface DistanceSelectProps {
  label: string
  value: number
  onChange: (value: number) => void
}

const DistanceSelect = (props: DistanceSelectProps): ReactElement => {
  const toMeters = (fragments: DistanceFragments): number => fragments.km * 1000 + fragments.m

  const toDistanceFragments = (meters: number): DistanceFragments => ({
    km: Math.floor(meters / 1000),
    m: meters % 1000,
  })

  const handleChange = (fragmentName: DistanceFragmentName, value: number) => {
    const fragments = toDistanceFragments(props.value)
    fragments[fragmentName] = value
    props.onChange(toMeters(fragments))
  }

  const distanceFragments = toDistanceFragments(props.value)

  return (
    <div className="distance-select">
      <div className="distance-select__label">{props.label}</div>
      <div className="distance-select__input">
        <NumberSelect
          name="km"
          value={distanceFragments.km}
          max="100"
          onChange={(value) => handleChange('km', value)}
        />
        <span className="distance-select__separator">.</span>
        <NumberSelect
          name="m"
          value={distanceFragments.m}
          max="999"
          pad="3"
          onChange={(value) => handleChange('m', value)}
        />
        <span className="distance-select__value-label">m</span>
      </div>
    </div>
  )
}

export default DistanceSelect
