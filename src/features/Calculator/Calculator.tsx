import React, { useEffect, useState } from 'react'
import DurationSelect from './DurationSelect'
import DistanceSelect from './DistanceSelect'
import PaceSelect from './PaceSelect'
import './Calculator.scss'

type CalculatorField = 'duration' | 'distance' | 'pace'

const Calculator = () => {
  const [durationInSeconds, setDurationInSeconds] = useState(0)
  const [distanceInMeters, setDistanceInMeters] = useState(0)
  const [paceInSeconds, setPaceInSeconds] = useState(0)
  const [changedFields, setChanged] = useState([] as CalculatorField[])

  const handleClear = () => {
    setDurationInSeconds(0)
    setDistanceInMeters(0)
    setPaceInSeconds(0)
    setChanged([])
  }

  const handleDurationChange = (value: number) => {
    setDurationInSeconds(value)
    setChanged([...changedFields.filter((i) => i !== 'duration').slice(-1), 'duration' as CalculatorField])
  }

  const handleDistanceChange = (value: number) => {
    setDistanceInMeters(value)
    setChanged([...changedFields.filter((i) => i !== 'distance').slice(-1), 'distance' as CalculatorField])
  }

  const handlePaceChange = (value: number) => {
    setPaceInSeconds(value)
    setChanged([...changedFields.filter((i) => i !== 'pace').slice(-1), 'pace' as CalculatorField])
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

  useEffect(() => {
    const shouldCalculate = (field: CalculatorField): boolean => {
      if (changedFields.length < 2) return false
      return !changedFields.find((changedField) => changedField === field)
    }

    if (shouldCalculate('duration')) setDurationInSeconds(calculateDuration(distanceInMeters, paceInSeconds))
    if (shouldCalculate('distance')) setDistanceInMeters(calculateDistance(durationInSeconds, paceInSeconds))
    if (shouldCalculate('pace')) setPaceInSeconds(calculatePace(durationInSeconds, distanceInMeters))
  }, [changedFields, durationInSeconds, distanceInMeters, paceInSeconds])

  return (
    <div className="calculator">
      <div className="calculator__header">
        <div>Pace Calculator</div>
        <button onClick={() => handleClear()}>Clear</button>
      </div>
      <DurationSelect label="Time" value={durationInSeconds} onChange={handleDurationChange} />
      <DistanceSelect label="Distance" value={distanceInMeters} onChange={handleDistanceChange} />
      <PaceSelect label="Pace" value={paceInSeconds} onChange={handlePaceChange} />
    </div>
  )
}

export default Calculator
