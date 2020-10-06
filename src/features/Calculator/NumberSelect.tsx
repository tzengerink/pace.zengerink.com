import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import './NumberSelect.scss'

interface NumberSelectProps {
  name: string
  value: number
  onChange: (value: number) => void
  max: string
  pad?: string
}

const NumberSelect = (props: NumberSelectProps) => {
  const [isActive, setIsActive] = useState(false)

  const displayValue = (value: number): string => {
    return props.pad ? value.toString().padStart(parseInt(props.pad, 10), '0') : value.toString()
  }

  const handleOptionClick = (event: React.MouseEvent<HTMLElement>) => {
    const value = event.currentTarget.getAttribute('data-value')
    if (value === null) return
    setIsActive(false)
    props.onChange(parseInt(value, 10))
  }

  const handleMouseDownOutside = (event: globalThis.MouseEvent | globalThis.TouchEvent) => {
    const target = event.target as HTMLElement
    if (!target.classList.contains('number-select__option') && !target.classList.contains('number-select__value')) {
      setIsActive(false)
    }
  }

  const createRenderedOptions = () => {
    const options = []

    for (let i = 0; i <= parseInt(props.max, 10); i++) {
      options.push({ displayValue: displayValue(i), value: i })
    }

    return options.map((option) => {
      return (
        <div
          className={classNames({
            'number-select__option': true,
            'number-select__option--selected': option.value === props.value,
          })}
          key={option.displayValue}
          data-value={option.value}
          onClick={handleOptionClick}
        >
          {option.displayValue}
        </div>
      )
    })
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleMouseDownOutside, false)
    return () => {
      document.removeEventListener('mousedown', handleMouseDownOutside, false)
    }
  })

  return (
    <div className={classNames({ 'number-select': true, 'number-select--active': isActive })}>
      <div className="number-select__wrapper">
        <div className="number-select__value" onClick={() => setIsActive((wasActive) => !wasActive)}>
          {displayValue(props.value)}
        </div>
        <div className="number-select__options">{createRenderedOptions()}</div>
      </div>
    </div>
  )
}

export default NumberSelect
