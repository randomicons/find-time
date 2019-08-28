//@flow
import React from 'react'
import {DateTime, Duration, Interval} from 'luxon'
import {connect} from "react-redux"
import {intervalToStr} from "../util/date-util"
import {withRouter} from "react-router-dom"

export type STask = { name: string, interval: Interval, deadline: ?DateTime, id: string }
export type SchedOpts = { startTime: DateTime, endTime: DateTime, maxTaskTime: Duration, breakTime: Duration }

class ConnectedSchedule extends React.Component<{ schedTasks: Array<STask> }> {
  render() {
    return <div>
      {
        this.props.schedTasks && this.props.schedTasks.map(stask =>
          <li key={stask.id}>name: {stask.name}, interval: {intervalToStr(stask.interval)},
            deadline: {stask.deadline}</li>
        )
      }
    </div>
  }
}

const mapStateToProps = state => {
  return {schedTasks: state.schedTasks}
}

export default withRouter(connect(mapStateToProps)(ConnectedSchedule))

