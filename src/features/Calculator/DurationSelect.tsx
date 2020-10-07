import React, { ReactElement } from 'react'
import NumberSelect from './NumberSelect'
import './DurationSelect.scss'

type DurationFragmentName = 'hours' | 'minutes' | 'seconds'

interface DurationFragments {
  hours: number
  minutes: number
  seconds: number
}

interface DurationSelectProps {
  label: string
  value: number
  onChange: (value: number) => void
}

const toSeconds = (fragments: DurationFragments): number => {
  const hours = fragments.hours * 3600
  const minutes = fragments.minutes * 60
  return hours + minutes + fragments.seconds
}

const toDuration = (seconds: number): DurationFragments => {
  const date = new Date(seconds * 1000)
  return {
    hours: date.getUTCHours(),
    minutes: date.getUTCMinutes(),
    seconds: date.getSeconds(),
  }
}

const DurationSelect = (props: DurationSelectProps): ReactElement => {
  const handleChange = (fragmentName: DurationFragmentName, value: number) => {
    const fragments = toDuration(props.value)
    fragments[fragmentName] = value
    props.onChange(toSeconds(fragments))
  }

  const durationFragments = toDuration(props.value)

  return (
    <div className="duration-select">
      <div className="duration-select__label">{props.label}</div>
      <div className="duration-select__input">
        <NumberSelect
          name="hours"
          value={durationFragments.hours}
          max="23"
          onChange={(value) => handleChange('hours', value)}
        />
        <span className="duration-select__value-label">hrs</span>
        <NumberSelect
          name="minutes"
          value={durationFragments.minutes}
          max="59"
          pad="2"
          onChange={(value) => handleChange('minutes', value)}
        />
        <span className="duration-select__value-label">min</span>
        <NumberSelect
          name="seconds"
          value={durationFragments.seconds}
          max="59"
          pad="2"
          onChange={(value) => handleChange('seconds', value)}
        />
        <span className="duration-select__value-label">sec</span>
      </div>
    </div>
  )
}

export default DurationSelect
