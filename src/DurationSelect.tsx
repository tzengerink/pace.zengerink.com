import React from 'react'
import NumberSelect from './NumberSelect'

interface DurationSelectProps {
    value: number
}

interface DurationSelectState {}

interface Duration {
    hours: number
    minutes: number
    seconds: number
}

export default class DurationSelect extends React.Component<DurationSelectProps, DurationSelectState> {
    toDuration(seconds: number): Duration {
        let date = new Date(seconds * 1000);

        return {
            hours: date.getUTCHours(),
            minutes: date.getUTCMinutes(),
            seconds: date.getSeconds() 
        }
    }

    render () {
        const duration = this.toDuration(this.props.value);

        return (
            <div className="duration-select">
                <NumberSelect value={duration.hours} max="23" />
                <span>:</span>
                <NumberSelect value={duration.minutes} max="59" pad="2" />
                <span>:</span>
                <NumberSelect value={duration.seconds} max="59" pad="2" />
                <span>hh:mm:ss</span>
            </div>
        )
    }
}