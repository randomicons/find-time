import React, {ChangeEvent, Component} from 'react'
import {Event} from "../../../interfaces";
import styles from "./Event.module.scss"
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {DateTime, Duration} from "luxon";
import {deleteEvent} from "../../../actions/events";

export interface EventInput {
    name: string,
    startTime: DateTime,
    duration: Duration
}

class EventComponent extends Component<Event & { dispatch: Dispatch }, EventInput & { hovered: boolean }> {
    constructor(props: Event & { dispatch: Dispatch }) {
        super(props)
        this.state = {...this.props, hovered: false}
    }

    deleteTask = () => {
        let {hovered, ...task} = this.state
        this.props.dispatch<any>(deleteEvent({...task, id: this.props.id}))
    }

    validateDur = (event: ChangeEvent<HTMLInputElement>) => {
        //     console.log(event.target.value)
        //     if (parseInt(event.target.value) > 0)
        //         this.setState({duration: Duration.fromObject({minute: parseInt(event.currentTarget.value)})},
        //             this.updateTask)
        //     else {
        //         event.preventDefault()
        //     }
    }
    //
    // updateTask = debounce(() => {
    //     console.log("debounce name")
    //     this.props.dispatch<any>(updateTask({
    //         name: this.state.name,
    //         duration: this.state.duration,
    //         deadline: this.state.deadline,
    //         id: this.props.id
    //     }))
    // }, 1000)
    //
    // validateName = (event: ChangeEvent<HTMLInputElement>) => {
    //     if (event.target.value) {
    //         this.setState({name: event.target.value}, this.updateTask)
    //     } else {
    //         // TODO: Change so it makes it red instead
    //         event.preventDefault()
    //     }
    // }


    toggleDelete = () => {
        this.setState({hovered: !this.state.hovered})
    }

    render() {
        const dur = this.state.duration.as("minutes")
        return <div className={styles.task} onMouseEnter={this.toggleDelete} onMouseLeave={this.toggleDelete}>
            {/*<input placeholder="name" value={this.props.name} onChange={(e) => this.setState({name: e.target.value})}/>*/}
            <input type="text" value={this.state.name} name={"name"} onChange={() => {
            }}/>
            <label>
                takes
                <input type='number' style={{width: (2 + dur.toString().length) + "ch"}} value={dur}
                       onChange={this.validateDur}/>
                minutes
            </label>
            {
                <label>
                    at
                    <input style={{width: (2 + this.props.startTime.toString().length) + "ch"}}
                           value={this.props.startTime.toLocaleString()}
                           onChange={this.validateDur}/>
                </label>
            }
            {this.state.hovered && <button onClick={this.deleteTask} className={styles.delete}>x</button>}
        </div>
    }
}

export default connect()(EventComponent)