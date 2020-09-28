import React from 'react'

interface NumberSelectProps {
  name: string
  value: number
  onChange: (value: number) => void
  max: string
  pad?: string
}

export default class NumberSelect extends React.Component<NumberSelectProps, {}> {
  constructor(props: any) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  displayValue(value: number): string {
    if (!this.props.pad) {
      return value.toString()
    }

    return value.toString().padStart(parseInt(this.props.pad, 10), '0')
  }

  handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    this.props.onChange(parseInt(event.currentTarget.value, 10))
  }

  render() {
    const options = []
    for (let i = 0; i <= parseInt(this.props.max, 10); i++) {
      options.push({ displayValue: this.displayValue(i), value: i })
    }

    const items = options.map((option) => (
      <option key={option.displayValue} value={option.value}>
        {option.displayValue}
      </option>
    ))

    return (
      <select name={this.props.name} value={this.props.value} onChange={this.handleChange}>
        {items}
      </select>
    )
  }
}
