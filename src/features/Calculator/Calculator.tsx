import React, { ReactElement, useReducer } from 'react'
import DurationSelect from './DurationSelect'
import DistanceSelect from './DistanceSelect'
import PaceSelect from './PaceSelect'
import './Calculator.scss'

type CalculatorField = 'duration' | 'distance' | 'pace'

interface CalculatorState {
  duration: number
  distance: number
  pace: number
  changedFields: CalculatorField[]
}

interface CalculatorChangePayload {
  field: CalculatorField
  value: number
}

interface CalculatorAction {
  type: string
  payload?: CalculatorChangePayload
}

const calculateDistance = (duration: number, pace: number) => {
  const durationInMinutes = duration / 60
  const paceInMinutes = pace / 60
  const paceInKilometers = durationInMinutes / paceInMinutes
  return Math.round(paceInKilometers * 1000)
}

const calculateDuration = (distance: number, pace: number) => {
  const distanceInKilometers = distance / 1000
  const paceInMinutes = pace / 60
  const durationInMinutes = distanceInKilometers * paceInMinutes
  return Math.round(durationInMinutes * 60)
}

const calculatePace = (duration: number, distance: number) => {
  const distanceInKilometers = distance / 1000
  const durationInMinutes = duration / 60
  const paceInMinutes = durationInMinutes / distanceInKilometers
  return Math.round(paceInMinutes * 60)
}

const Calculator = (): ReactElement => {
  const defaultState = {
    duration: 0,
    distance: 0,
    pace: 0,
    changedFields: [],
  } as CalculatorState

  const reducer = (prevState: CalculatorState, action: CalculatorAction): CalculatorState => {
    switch (action.type) {
      case 'calculator/clear':
        return defaultState

      case 'calculator/change':
        const field = action.payload?.field ? action.payload?.field : ''
        const value = action.payload?.value

        const getValue = (fieldName: CalculatorField) => {
          const val = field === fieldName ? value : prevState[fieldName]
          return val ? val : 0
        }

        const duration = getValue('duration')
        const distance = getValue('distance')
        const pace = getValue('pace')

        const changedFields = [
          ...prevState.changedFields.filter((f: CalculatorField) => f !== field).slice(-1),
          field as CalculatorField,
        ]

        const shouldCalculate = (fieldName: CalculatorField): boolean => {
          if (changedFields.length < 2) return false
          return !changedFields.find((changedField: CalculatorField) => changedField === fieldName)
        }

        return {
          duration: shouldCalculate('duration') ? calculateDuration(distance, pace) : duration,
          distance: shouldCalculate('distance') ? calculateDistance(duration, pace) : distance,
          pace: shouldCalculate('pace') ? calculatePace(duration, distance) : pace,
          changedFields,
        }

      default:
        throw new Error()
    }
  }

  const [state, dispatch] = useReducer(reducer, defaultState)

  return (
    <div className="calculator">
      <div className="calculator__header">
        <div>Pace Calculator</div>
        <button onClick={() => dispatch({ type: 'calculator/clear' })}>Clear</button>
      </div>
      <DurationSelect
        label="Time"
        value={state?.duration}
        onChange={(value) => dispatch({ type: 'calculator/change', payload: { field: 'duration', value } })}
      />
      <DistanceSelect
        label="Distance"
        value={state?.distance}
        onChange={(value) => dispatch({ type: 'calculator/change', payload: { field: 'distance', value } })}
      />
      <PaceSelect
        label="Pace"
        value={state?.pace}
        onChange={(value) => dispatch({ type: 'calculator/change', payload: { field: 'pace', value } })}
      />
    </div>
  )
}

export default Calculator
