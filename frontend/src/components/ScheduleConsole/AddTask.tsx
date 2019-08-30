import React, {SyntheticEvent} from 'react'
import {addTask} from "../../actions/tasks"
import {connect} from 'react-redux'
import {createDurMin} from "../../util/date-util"
import {Dispatch} from "redux";
import {TaskState} from "./Task";


class ConnectedAddTask extends React.Component<{ dispatch: Dispatch }, TaskState> {
    handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault()
        if (this.state.name != null && this.state.duration != null) {
            this.props.dispatch<any>(addTask({name: this.state.name, duration: createDurMin(this.state.duration)}))
            this.formRef!.reset()
            this.setState({name: "", duration: -1})
        }
    }

    validateDur = (event: SyntheticEvent<HTMLInputElement>) => {
        //TODO: change color on bad value
        if (parseInt(event.currentTarget.value) > 0)
            this.setState({duration: parseInt(event.currentTarget.value)})
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

const AddTask = connect()(ConnectedAddTask)
export default AddTask