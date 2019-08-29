import React from 'react'
import Task, {TaskType} from './Task'
import {connect} from "react-redux"
import AddTask from "./AddTask"
import {MainState} from "../reducers";

export interface Tasks {
    [name: string]: TaskType
}

class ListTasks extends React.Component<{ tasks: Tasks }> {
    render() {
        return <div>
            {Object.values(this.props.tasks).map(val =>
                <li key={val.name}><Task name={val.name} dur={val.dur} deadline={val.deadline}/>
                </li>
            )
            }
            <AddTask/>
        </div>
    }
}

const mapStateToProps = (state: MainState) => {
    return {tasks: state.tasks}
}

export default connect(mapStateToProps)(ListTasks)
