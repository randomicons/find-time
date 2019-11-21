import React from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
// @ts-ignore
import interactionPlugin from '@fullcalendar/interaction'

import '@fullcalendar/core/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'
import {connect} from "react-redux";
import {Duration} from "luxon";
import {Dispatch} from "redux";
import {CHANGE_TASK_DUR} from "../../constants/action";
import {MainState} from "../../reducers";
import {SEvent, STask} from "../../interfaces";


class Schedule extends React.Component<{ dispatch: Dispatch, schedTasks: STask[], schedEvents: SEvent[] }> {
    render() {
        const events: Array<any> = []
        for (const task of this.props.schedTasks) {
            events.push(
                {title: task.name, start: task.interval.start.toJSDate(), end: task.interval.end.toJSDate()}
            )
        }
        for (const event of this.props.schedEvents) {
            events.push(
                {title: event.name, start: event.interval.start.toJSDate(), end: event.interval.end.toJSDate()}
            )
        }
        return <FullCalendar slotDuration="00:30:00" defaultView="timeGrid"
                             plugins={[timeGridPlugin, interactionPlugin]}
                             events={events} nowIndicator eventDurationEditable eventOverlap={true}
                             dayCount={2} eventResize={this.resizeTask}
        />
    }

    resizeTask = (arg: any) => {
        let dur = Duration.fromObject(arg.endDelta)
        this.props.dispatch({type: CHANGE_TASK_DUR, payload: {name: arg.event.title, duration: dur}})
    }

}

const mapStateToProps = (state: MainState) => {
    return {schedTasks: state.tasks.schedTasks, schedEvents: state.events.schedEvents}
}
export default connect(mapStateToProps)(Schedule)

