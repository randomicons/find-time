import React, {Component, SyntheticEvent} from 'react'
import {DateTime, Duration} from 'luxon'

export type TaskType = {
    name: string, dur: Duration, deadline?: DateTime,
}
export type TaskState = { name: string, dur: number }


class Task extends Component<TaskType, TaskState> {
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

export default Task