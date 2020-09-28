import React, { MouseEvent } from 'react'
import classNames from 'classnames'
import './NumberSelect.scss'

interface NumberSelectProps {
  name: string
  value: number
  onChange: (value: number) => void
  max: string
  pad?: string
}

interface NumberSelectState {
  active: boolean
}

export default class NumberSelect extends React.Component<NumberSelectProps, NumberSelectState> {
  constructor(props: any) {
    super(props)

    this.state = {
      active: false,
    }

    this.toggleActive = this.toggleActive.bind(this)
    this.handleOptionClick = this.handleOptionClick.bind(this)
    this.handleMouseDownOutside = this.handleMouseDownOutside.bind(this)
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleMouseDownOutside, false)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleMouseDownOutside, false)
  }

  displayValue(value: number): string {
    return this.props.pad ? value.toString().padStart(parseInt(this.props.pad, 10), '0') : value.toString()
  }

  handleMouseDownOutside(event: globalThis.MouseEvent | globalThis.TouchEvent) {
    const target = event.target as HTMLElement
    if (!target.classList.contains('number-select__option') && !target.classList.contains('number-select__value')) {
      this.setState({
        active: false,
      })
    }
  }

  toggleActive(event: React.MouseEvent<HTMLElement>) {
    this.setState((prevState) => ({
      active: !prevState.active,
    }))
  }

  handleOptionClick(event: React.MouseEvent<HTMLElement>) {
    const value = event.currentTarget.getAttribute('data-value')
    if (value === null) {
      return
    }
    this.setState({ active: false })
    this.props.onChange(parseInt(value, 10))
  }

  render() {
    const mainClassNames = classNames({
      'number-select': true,
      'number-select--active': this.state.active,
    })

    const options = []
    for (let i = 0; i <= parseInt(this.props.max, 10); i++) {
      options.push({ displayValue: this.displayValue(i), value: i })
    }
    const optionElements = options.map((option) => {
      const optionClassNames = classNames({
        'number-select__option': true,
        'number-select__option--selected': option.value === this.props.value,
      })
      return (
        <div
          className={optionClassNames}
          key={option.displayValue}
          data-value={option.value}
          onClick={this.handleOptionClick}
        >
          {option.displayValue}
        </div>
      )
    })

    return (
      <div className={mainClassNames}>
        <div className="number-select__wrapper">
          <div className="number-select__value" onClick={this.toggleActive}>
            {this.displayValue(this.props.value)}
          </div>
          <div className="number-select__options">{optionElements}</div>
        </div>
      </div>
    )
  }
}
