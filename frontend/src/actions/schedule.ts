import {DateTime, Duration, Interval} from "luxon";
import {SCHEDULE_EVENTS, SCHEDULE_TASKS} from "../constants/action";
import {Event, SchedOpts, STask, Task} from "../interfaces";


export function scheduleEvents(events: Array<Event>) {
    return {
        type: SCHEDULE_EVENTS,
        payload: events.map(e => ({id: e.id, duration: e.duration, interval: Interval.after(e.startTime, e.duration)}))
    }
}

/**
 * TODO Call this occasionally in the background?
 * @param tasks
 * @param opts
 * @param curTime
 */
export function schedule(tasks: Array<Task>, opts: SchedOpts, curTime: DateTime = DateTime.local()) {
    const {endTime, startTime} = opts
    // Currently only support hour and not minutes for start and end times
    if (curTime.hour < startTime.hour) {
        curTime = curTime.set({hour: startTime.hour})
    }

    // Sort by deadline
    tasks.sort((a: Task, b: Task) => {
        const deadA = a.deadline
        const deadB = b.deadline
        if (deadA == null && deadB == null) return 0
        if (deadB == null) return -1
        if (deadA == null) return 1
        //TODO: check this line
        return deadA <= deadB ? -1 : 1
    })
    const sched: Array<STask> = []
    let curUsedTime = Duration.fromObject({})
    for (let val of tasks) {
        if (curTime.hour >= endTime.hour) {
            curTime = curTime.set({
                hour: startTime.hour,
                minute: 0,
                second: 0, millisecond: 0,
                day: startTime.day + 1
            })
        }
        console.log(val)
        let dur = val.duration
        sched.push({id: val.id, name: val.name, interval: Interval.after(curTime, dur), deadline: val.deadline})
        curUsedTime = curUsedTime.plus(dur)
        curTime = curTime.plus(dur)
    }
    // console.log(sched)
    return {type: SCHEDULE_TASKS, payload: sched}
}