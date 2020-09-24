import React from 'react'

interface NumberSelectProps {
    value: number
    max: string
    pad?: string
}

interface NumberSelectState {}

export default class NumberSelect extends React.Component<NumberSelectProps, NumberSelectState> {

    displayValue(value: number): string {
        if (!this.props.pad) {
            return value.toString();
        }

        return value.toString().padStart(parseInt(this.props.pad), '0')
    }

    render() {
        const options = [];
        for (let i = 0; i <= parseInt(this.props.max); i++) {
            options.push({displayValue: this.displayValue(i), value: i})
        }

        const items = options.map((option) => 
            <option key={option.displayValue} value={option.value}>{option.displayValue}</option>
        )

        return (
            <select value={this.props.value}>
                {items}
            </select>
        )
    }
}