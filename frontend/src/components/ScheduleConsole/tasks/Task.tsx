import React, {ChangeEvent, Component} from 'react'
import debounce from 'lodash/debounce'
import {Task} from "../../../interfaces";
import styles from "./Task.module.scss"
import {Dispatch} from "redux";
import {deleteTask, updateTask} from "../../../actions/tasks";
import {connect} from "react-redux";
import {DateTime, Duration} from "luxon";

export interface TaskInput {
    name: string,
    deadline?: DateTime,
    duration: Duration
}

class TaskComponent extends Component<Task & { dispatch: Dispatch }, TaskInput & { hovered: boolean }> {
    constructor(props: Task & { dispatch: Dispatch }) {
        super(props)
        this.state = {...this.props, hovered: false}
    }

    deleteTask = () => {
        let {hovered, ...task} = this.state
        this.props.dispatch<any>(deleteTask({...task, id: this.props.id}))
    }

    validateDur = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        if (parseInt(event.target.value) > 0)
            this.setState({duration: Duration.fromObject({minute: parseInt(event.currentTarget.value)})},
                this.updateTask)
        else {
            event.preventDefault()
        }
    }

    updateTask = debounce(() => {
        console.log("debounce name")
        this.props.dispatch<any>(updateTask({
            name: this.state.name,
            duration: this.state.duration,
            deadline: this.state.deadline,
            id: this.props.id
        }))
    }, 1000)

    validateName = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value) {
            this.setState({name: event.target.value}, this.updateTask)
        } else {
            // TODO: Change so it makes it red instead
            event.preventDefault()
        }
    }


    toggleDelete = () => {
        this.setState({hovered: !this.state.hovered})
    }

    render() {
        const dur = this.state.duration.as("minutes")
        return <div className={styles.task} onMouseEnter={this.toggleDelete} onMouseLeave={this.toggleDelete}>
            {/*<input placeholder="name" value={this.props.name} onChange={(e) => this.setState({name: e.target.value})}/>*/}
            <input type="text" value={this.state.name} name={"name"} onChange={this.validateName}/>
            <label>
                takes
                <input type='number' style={{width: (2 + dur.toString().length) + "ch"}} value={dur}
                       onChange={this.validateDur}/>
                minutes
            </label>
            {
                this.props.deadline && <label>
                  due by
                  <input style={{width: (2 + this.props.deadline.toString().length) + "ch"}}
                         value={this.props.deadline.toLocaleString()}
                         onChange={this.validateDur}/>
                </label>
            }
            {this.state.hovered && <button onClick={this.deleteTask} className={styles.delete}>x</button>}
        </div>
    }
}

export default connect()(TaskComponent)