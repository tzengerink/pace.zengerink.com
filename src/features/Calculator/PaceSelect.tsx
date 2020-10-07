import React, { ReactElement } from 'react'
import NumberSelect from './NumberSelect'
import './PaceSelect.scss'

type PaceFragmentName = 'minutes' | 'seconds'

interface PaceSelectProps {
  label: string
  value: number
  onChange: (value: number) => void
}

interface PaceFragments {
  minutes: number
  seconds: number
}

const toSeconds = (pace: PaceFragments): number => pace.minutes * 60 + pace.seconds
const toPace = (seconds: number): PaceFragments => ({ minutes: Math.floor(seconds / 60), seconds: seconds % 60 })

const PaceSelect = (props: PaceSelectProps): ReactElement => {
  const handleChange = (fragmentName: PaceFragmentName, value: number) => {
    const fragments = toPace(props.value)
    fragments[fragmentName] = value
    props.onChange(toSeconds(fragments))
  }

  const paceFragments = toPace(props.value)

  return (
    <div className="pace-select">
      <div className="pace-select__label">{props.label}</div>
      <div className="pace-select__input">
        <NumberSelect
          name="minutes"
          value={paceFragments.minutes}
          max="59"
          onChange={(value) => handleChange('minutes', value)}
        />
        <span className="pace-select__separator">:</span>
        <NumberSelect
          name="seconds"
          value={paceFragments.seconds}
          max="59"
          pad="2"
          onChange={(value) => handleChange('seconds', value)}
        />
        <span className="pace-select__value-label">min/km</span>
      </div>
    </div>
  )
}

export default PaceSelect
