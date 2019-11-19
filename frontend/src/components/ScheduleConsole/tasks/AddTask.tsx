import React, {SyntheticEvent} from 'react'
import {addTask} from "../../../actions/tasks"
import {connect} from 'react-redux'
import {Dispatch} from "redux";
import {TaskInput} from "./Task";
import {DateTime, Duration} from "luxon";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from './AddTask.module.scss'
import {uuid} from "uuidv4";

// import 'react-datepicker/dist/react-datepicker-cssmodules.css';


class ConnectedAddTask extends React.Component<{ dispatch: Dispatch }, TaskInput> {
    constructor(props: { dispatch: Dispatch }) {
        super(props)
        this.state = {
            name: "",
            duration: Duration.fromObject({}),
        }
    }

    handleDeadlineChange = (date: Date) => {
        this.setState({deadline: DateTime.fromJSDate(date)})
    }
    handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault()
        if (this.state.name != null && this.state.duration != null) {
            this.props.dispatch<any>(addTask({
                id: uuid(),
                name: this.state.name,
                duration: this.state.duration,
                deadline: this.state.deadline
            }))
            this.formRef!.reset()
            this.setState({name: "", duration: Duration.fromObject({})})
        }
    }

    handleMinChange = (min: number) => {
        if (isNaN(min)) min = 0
        this.setState({duration: this.state.duration.set({minute: min})});
    }

    handleHourChange = (hour: number) => {
        if (isNaN(hour)) hour = 0
        this.setState({duration: this.state.duration.set({hour: hour})})
    }

    validateDur = (event: SyntheticEvent<HTMLInputElement>) => {
        //TODO: change color on bad value
        // if (parseInt(event.currentTarget.value) > 0)
        //     this.setState({duration: parseInt(event.currentTarget.value)})
        // else {
        //     event.preventDefault()
        // }
    }
    private formRef?: HTMLFormElement | null = null;


    render() {
        return <form ref={(el) => this.formRef = el} onSubmit={this.handleSubmit} className={styles.task}>
            <input placeholder="name" onChange={(e) => this.setState({name: e.target.value})}/>
            <label>
                takes
                <input type='number' min='0' onChange={e => this.handleHourChange(parseInt(e.target.value))}/>
                hours
                <input type='number' min='0' onChange={e => this.handleMinChange(parseInt(e.target.value))}/>
                minutes
            </label>
            <label>
                & is due by
                <DatePicker selected={this.state.deadline ? this.state.deadline.toJSDate() : null}
                            onChange={this.handleDeadlineChange} placeholderText="mm/dd/yyyy"/>
            </label>
            <button type="submit" onClick={this.handleSubmit}>ADD</button>
        </form>
    }
}

const AddTask = connect()(ConnectedAddTask)
export default AddTask