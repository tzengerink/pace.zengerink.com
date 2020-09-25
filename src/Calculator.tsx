import React from 'react'
import DurationSelect from './DurationSelect'
import DistanceSelect from './DistanceSelect'

enum CalculatorValue {
    Seconds = 'seconds',
    Meters = 'meters'
}

interface CalculatorProps {}

interface CalculatorState {
    [key: string]: number
}

export default class Calculator extends React.Component<CalculatorProps, CalculatorState> {
    constructor(props: any) {
        super(props)

        this.state = {
            [CalculatorValue.Seconds]: 0,
            [CalculatorValue.Meters]: 0
        }
    }

    handleChange(prop: CalculatorValue, value: number) {
        this.setState({
            [prop]: value,
        })
    }

    render() {
        return (
            <div className="calculator">
                <div className="calculator__header">Pace Calculator</div>
                <DurationSelect value={this.state[CalculatorValue.Seconds]} onChange={this.handleChange.bind(this, CalculatorValue.Seconds)} />
                <DistanceSelect value={this.state[CalculatorValue.Meters]} onChange={this.handleChange.bind(this, CalculatorValue.Meters)} />
            </div>
        )
    }
}