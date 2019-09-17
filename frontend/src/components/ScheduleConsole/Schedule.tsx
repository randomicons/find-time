import React from 'react'
import {connect} from "react-redux"
import {intervalToStr} from "../../util/date-util"
import {MainState, STask} from "../../interfaces";
import styles from './Schedule.module.scss'

class Schedule extends React.Component<{ schedTasks: Array<STask> }> {
    render() {
        const out: Array<any> = []
        for (const task of this.props.schedTasks) {
            out.push(
                <li>{task.name} <span>from </span> {intervalToStr(task.interval)}
                </li>
            )
        }
        return <div className={styles.container}>
            {
                this.props.schedTasks && out
            }
        </div>
    }
}

const mapStateToProps = (state: MainState) => {
    return {schedTasks: state.schedTasks}
}
export default connect(mapStateToProps)(Schedule)

