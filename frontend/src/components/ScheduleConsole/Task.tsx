import React, {Component, SyntheticEvent} from 'react'
import {TaskType} from "../../interfaces";
import {DateTime, Duration} from "luxon";
import styles from "./Task.module.scss"

export type TaskState = { name: string, duration: Duration, deadline?: DateTime, hovered: boolean }


class Task extends Component<TaskType, TaskState> {
    constructor(props: TaskType) {
        super(props)
        this.state = {...this.props, hovered: false}
    }

    validateDur = (event: SyntheticEvent<HTMLInputElement>) => {
        //TODO: change color on bad value
        // if (parseInt(event.currentTarget.value) > 0)
        // this.setState({duration: parseInt(event.currentTarget.value)})
        // else {
        //     event.preventDefault()
        // }
    }


    toggleDelete = () => {
        this.setState({hovered: !this.state.hovered})
    }

    render() {
        const dur = this.props.duration.as("minutes")
        return <div className={styles.task} onMouseEnter={this.toggleDelete} onMouseLeave={this.toggleDelete}>
            {/*<input placeholder="name" value={this.props.name} onChange={(e) => this.setState({name: e.target.value})}/>*/}
            <span> {this.props.name}</span>
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
            {this.state.hovered && <button className={styles.delete}>x</button>}
        </div>
    }
}

export default Task