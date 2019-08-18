//@flow
import React, {Component} from 'react'
import {DateTime, Duration} from 'luxon'
import {connect} from 'react-redux'

export type TaskType = {
  name: string, dur: Duration, deadline: ?DateTime, id: string
}
export type TaskState = { name: string, dur: number }

const mapStateToProps = (state, ownProps) => {
  return state.tasks[ownProps.id]
}

class ConnectTask extends Component<TaskType, TaskState> {
  // constructor(props) {
  //   super(props)
  // }
  validateDur = (event: SyntheticEvent<HTMLInputElement>) => {
    //TODO: change color on bad value
    if (parseInt(event.currentTarget.value) > 0)
      this.setState({dur: parseInt(event.currentTarget.value)})
    else {
      event.preventDefault()
    }
  }

  render() {
    return <div>
      <input placeholder="name" value={this.props.name} onChange={(e) => this.setState({name: e.target.value})}/>
      <label>
        Duration:
        <input type='number' value={this.props.dur.as("minutes")} onChange={this.validateDur}/>
        minutes
      </label>
      {/*<label>*/}
      {/*  Deadline:*/}
      {/*  <input type='number' onChange={(e) => this.setState({dur: e.target.value})}/>*/}
      {/*</label>*/}
    </div>
  }
}

const Task = connect(mapStateToProps)(ConnectTask)
export default Task