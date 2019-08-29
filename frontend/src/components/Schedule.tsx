import React from 'react'
import {DateTime, Duration, Interval} from 'luxon'
import {connect} from "react-redux"
import {intervalToStr} from "../util/date-util"
import {MainState} from '../reducers'

export interface STask {
    name: string,
    interval: Interval,
    deadline?: DateTime
}

export interface SchedOpts {
    startTime: DateTime,
    endTime: DateTime,
    maxTaskTime: Duration,
    breakTime: Duration
}

class ConnectedSchedule extends React.Component<{ schedTasks: Array<STask> }> {
    render() {
        return <div>
            {
                this.props.schedTasks && this.props.schedTasks.map(stask =>
                    <li key={stask.name}>name: {stask.name}, interval: {intervalToStr(stask.interval)},
                        deadline: {stask.deadline}</li>
                )
            }
        </div>
    }
}

const mapStateToProps = (state: MainState) => {
    return {schedTasks: state.schedTasks}
}
export default connect(mapStateToProps)(ConnectedSchedule)

