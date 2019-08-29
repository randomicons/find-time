import React, {SyntheticEvent} from 'react'
import {addTask} from "../actions"
import {connect} from 'react-redux'
import {TaskState, TaskType} from "./Task"
import {createDurMin} from "../util/date-util"
import {Dispatch} from "redux";


class ConnectedAddTask extends React.Component<any, TaskState> {
    handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault()
        if (this.state.name != null && this.state.dur != null) {
            this.props.addTask({name: this.state.name, dur: createDurMin(this.state.dur)})
            this.formRef!.reset()
            this.setState({name: "", dur: -1})
        }
    }

    validateDur = (event: SyntheticEvent<HTMLInputElement>) => {
        //TODO: change color on bad value
        if (parseInt(event.currentTarget.value) > 0)
            this.setState({dur: parseInt(event.currentTarget.value)})
        else {
            event.preventDefault()
        }
    }
    private formRef?: HTMLFormElement | null = null;

    render() {
        return <form ref={(el) => this.formRef = el} onSubmit={this.handleSubmit}>
            <input placeholder="name" onChange={(e) => this.setState({name: e.target.value})}/>
            <label>
                Duration:
                <input type='number' onChange={this.validateDur}/>
                minutes
            </label>
            <button type="submit" onClick={this.handleSubmit}>ADD</button>
        </form>
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addTask: (task: TaskType) => dispatch<any>(addTask(task))
    }
}
const AddTask = connect(null, mapDispatchToProps)(ConnectedAddTask)
export default AddTask