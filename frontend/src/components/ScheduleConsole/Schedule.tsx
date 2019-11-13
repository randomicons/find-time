import React from 'react'
import {MainState, STask} from "../../interfaces"
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'

import '@fullcalendar/core/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'
import {connect} from "react-redux";

class Schedule extends React.Component<{ schedTasks: Array<STask> }> {
    render() {
        const events: Array<any> = []
        for (const task of this.props.schedTasks) {
            events.push(
                {title: task.name, start: task.interval.start.toJSDate(), end: task.interval.end.toJSDate()}
            )
        }
        return <FullCalendar slotDuration="00:30:00" defaultView="timeGridWeek" plugins={[timeGridPlugin]}
                             events={events} nowIndicator/>
    }
}

const mapStateToProps = (state: MainState) => {
    return {schedTasks: state.schedTasks}
}
export default connect(mapStateToProps)(Schedule)

