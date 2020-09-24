import React from 'react'

interface CalculatorProps {}

interface CalculatorState {}

export default class Calculator extends React.Component<CalculatorProps, CalculatorState> {
    render() {
        return (
            <div className="calculator">
                <div className="calculator__header">Pace Calculator</div>
            </div>
        )
    }
}