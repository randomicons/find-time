import React from 'react'
import ListTasks from "./ListTasks";
import Schedule from "./Schedule";
import {Dispatch} from "redux";
import {LOG_OFF} from "../../constants/action";
import {getTasks} from "../../actions/tasks";
import {connect} from "react-redux";

const LogOut = function (props: { dispatch: Dispatch }) {
    return <button onClick={() => props.dispatch({type: LOG_OFF})}>LOG OUT</button>
}

class ScheduleConsole extends React.Component<{ dispatch: Dispatch, loggedIn: boolean }> {

    componentDidMount(): void {
        this.props.dispatch<any>(getTasks())
    }

    render() {
        return <div>
            <LogOut dispatch={this.props.dispatch}/>
            <Schedule/>
            <ListTasks/>
        </div>
    }
}

export default connect()(ScheduleConsole)