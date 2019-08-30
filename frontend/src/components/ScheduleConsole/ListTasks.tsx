import React from 'react'
import {connect} from "react-redux"
import AddTask from "./AddTask"
import {MainState, Tasks} from "../../interfaces";
import {Dispatch} from "redux";
import {Redirect} from "react-router";
import Task from './Task';


class ListTasks extends React.Component<{ tasks: Tasks, loggedIn: boolean, dispatch: Dispatch }> {
    render() {
        return !this.props.loggedIn ?
            <Redirect to={'/'}/> :
            <div>
                {
                    Object.values(this.props.tasks).map(val =>
                        <li key={val.name}><Task name={val.name} duration={val.duration} deadline={val.deadline}/>
                        </li>
                    )
                }
                <AddTask/>
            </div>
    }

}

const mapStateToProps = (state: MainState) => {
    return {tasks: state.tasks, loggedIn: state.loggedIn}
}

export default connect(mapStateToProps)(ListTasks)
