import React from 'react'
import DurationSelect from './DurationSelect'
import DistanceSelect from './DistanceSelect'
import PaceSelect from './PaceSelect'

enum CalculatorValue {
    DurationInSeconds = 'seconds',
    DistanceInMeters = 'meters',
    PaceInSeconds = 'pace'
}

interface CalculatorProps {}

interface CalculatorState {
    [key: string]: number
}

export default class Calculator extends React.Component<CalculatorProps, CalculatorState> {
    constructor(props: any) {
        super(props)

        this.state = {
            [CalculatorValue.DurationInSeconds]: 0,
            [CalculatorValue.DistanceInMeters]: 0,
            [CalculatorValue.PaceInSeconds]: 0
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
                <DurationSelect 
                    value={this.state[CalculatorValue.DurationInSeconds]} 
                    onChange={this.handleChange.bind(this, CalculatorValue.DurationInSeconds)} 
                />
                <DistanceSelect 
                    value={this.state[CalculatorValue.DistanceInMeters]} 
                    onChange={this.handleChange.bind(this, CalculatorValue.DistanceInMeters)} 
                />
                <PaceSelect 
                    value={this.state[CalculatorValue.PaceInSeconds]} 
                    onChange={this.handleChange.bind(this, CalculatorValue.PaceInSeconds)} 
                />
            </div>
        )
    }
}