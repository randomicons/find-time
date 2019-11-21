import React from 'react'
import ListTasks from "./tasks/ListTasks";
import Schedule from "./Schedule";
import {Dispatch} from "redux";
import {LOG_OFF} from "../../constants/action";
import {getTasks} from "../../actions/tasks";
import {connect} from "react-redux";
import styles from './ScheduleConsole.module.scss'
import CurrentTaskPanel from "./current_task/CurrentTaskPanel";
import {STask} from "../../interfaces";
import ListEvents from "./events/ListEvents";
import AddEvent from "./AddEvent";
import AddTask from "./AddEvent";
import {MainState} from "../../reducers";
import {getEvents} from "../../actions/events";

const LogOut = function (props: { dispatch: Dispatch }) {
    return <button onClick={() => props.dispatch({type: LOG_OFF})}>LOG OUT</button>
}

class ScheduleConsole extends React.Component<{ dispatch: Dispatch, loggedIn: boolean, schedTasks: STask[] }, { addType: "task" | "event" }> {
    state = {
        addType: "task" as any
    }

    componentDidMount(): void {
        this.props.dispatch<any>(getEvents())
        this.props.dispatch<any>(getTasks())
    }

    render() {
        return <div className={styles.container}>
            {this.props.schedTasks[0] &&
            <CurrentTaskPanel task={this.props.schedTasks[0]} breakTime={10} workTime={10}/>}
            <LogOut dispatch={this.props.dispatch}/>
            <Schedule/>
            <ListTasks/>
            <ListEvents/>
            {this.state.addType === "event" && <AddEvent/>}
            {this.state.addType === "task" && <AddTask/>}
        </div>
    }
}

const mapStateToProps = (state: MainState) => {
    return {schedTasks: state.tasks.schedTasks}
}
export default connect(mapStateToProps)(ScheduleConsole)