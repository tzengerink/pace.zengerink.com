import React from 'react'
import DurationSelect from './DurationSelect'

interface CalculatorProps {}

interface CalculatorState {
    seconds: number
}

export default class Calculator extends React.Component<CalculatorProps, CalculatorState> {
    constructor(props: any) {
        super(props)

        this.state = {
            seconds: 0
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(value: number) {
        this.setState({
            seconds: value
        })
    }

    render() {
        return (
            <div className="calculator">
                <div className="calculator__header">Pace Calculator</div>
                <DurationSelect value={this.state.seconds} onChange={this.handleChange} />
            </div>
        )
    }
}