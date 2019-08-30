import React from 'react'
import {connect} from "react-redux"
import {intervalToStr} from "../util/date-util"
import {MainState, STask} from "../interfaces";


class ConnectedSchedule extends React.Component<{ schedTasks: Array<STask> }> {
    render() {
        return <div>
            {
                this.props.schedTasks && this.props.schedTasks.map(stask =>
                    <li key={stask.interval.toISO()}> name: {stask.name}, interval: {intervalToStr(stask.interval)},
                        deadline: {stask.deadline}</li>
                )
            }
        </div>
    }
}

const mapStateToProps = (state: MainState) => {
    return {schedTasks: state.schedTasks}
}
export default connect(mapStateToProps)(ConnectedSchedule)

