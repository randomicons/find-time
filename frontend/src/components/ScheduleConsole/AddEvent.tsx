import React, {SyntheticEvent} from 'react'
import {connect} from 'react-redux'
import {Dispatch} from "redux";
import {EventInput} from "./events/Event";
import {DateTime, Duration} from "luxon";
import LuxonUtils from '@date-io/luxon';
import "react-datepicker/dist/react-datepicker.css";
import styles from './AddEvent.module.scss'
import {uuid} from "uuidv4";
import {addEvent} from "../../actions/events";
import {DateTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers'

// import 'react-datepicker/dist/react-datepicker-cssmodules.css';


class AddTask extends React.Component<{ dispatch: Dispatch }, EventInput> {
    state = {
        name: "",
        duration: Duration.fromObject({}),
        startTime: DateTime.local()
    }

    startTimeChange = (date: any) => {
        this.setState({startTime: date})
    }

    handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault()
        if (this.state.name != null && this.state.duration != null) {
            this.props.dispatch<any>(addEvent({
                id: uuid(),
                name: this.state.name,
                duration: this.state.duration,
                startTime: this.state.startTime
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
                at
                <MuiPickersUtilsProvider utils={LuxonUtils}>
                    <DateTimePicker value={this.state.startTime} onChange={this.startTimeChange}/>
                </MuiPickersUtilsProvider>
            </label>
            <button type="submit" onClick={this.handleSubmit}>ADD</button>
        </form>
    }
}

export default connect()(AddTask)
