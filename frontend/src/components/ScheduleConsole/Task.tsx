import React, {Component, SyntheticEvent} from 'react'
import {TaskType} from "../../interfaces";

export type TaskState = { name: string, duration: number }


class Task extends Component<TaskType, TaskState> {
    validateDur = (event: SyntheticEvent<HTMLInputElement>) => {
        //TODO: change color on bad value
        if (parseInt(event.currentTarget.value) > 0)
            this.setState({duration: parseInt(event.currentTarget.value)})
        else {
            event.preventDefault()
        }
    }

    render() {
        return <div>
            {/*<input placeholder="name" value={this.props.name} onChange={(e) => this.setState({name: e.target.value})}/>*/}
            <label> name: <span>{this.props.name}</span></label>
            <label>
                Duration:
                <input type='number' value={this.props.duration.as("minutes")} onChange={this.validateDur}/>
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