import React from 'react'
import Task from './Task'
import {connect} from "react-redux"
import AddTask from "./AddTask"


class ListTasks extends React.Component {
  render() {
    return <div>
      {Object.keys(this.props.tasks).map(id =>
        <li key={id}><Task id={id}/>
        </li>
      )
      }
      <AddTask/>
    </div>
  }
}

const mapStateToProps = state => {
  return {tasks: state.tasks}
}

export default connect(mapStateToProps)(ListTasks)