import {DateTime, Duration, Interval} from "luxon";
import {SCHEDULE_TASKS} from "../constants/action";
import {SchedOpts, STask, TaskType} from "../interfaces";

export function schedule(tasks: Array<TaskType>, opts: SchedOpts, curTime: DateTime = DateTime.local()) {
    const {maxTaskTime, breakTime, endTime, startTime} = opts
    // Currently only support hour and not minutes for start and end times
    if (curTime.hour < startTime.hour) {
        curTime = curTime.set({hour: startTime.hour})
    }

    // Sort by deadline
    tasks.sort((a: TaskType, b: TaskType) => {
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
                second: 0,
                millisecond: 0,
                day: startTime.day + 1
            })
        }
        let dur = val.duration
        while (curUsedTime.plus(dur).minus(maxTaskTime).valueOf() >= 0) {
            const usedTime = maxTaskTime.minus(curUsedTime)
            dur = dur.minus(usedTime)
            sched.push({
                name: val.name,
                interval: Interval.after(curTime, usedTime),
                deadline: val.deadline,
            })
            curTime = curTime.plus(usedTime).plus(breakTime)
            curUsedTime = Duration.fromObject({})
        }
        sched.push({name: val.name, interval: Interval.after(curTime, dur), deadline: val.deadline})
        curUsedTime = curUsedTime.plus(dur)
        curTime = curTime.plus(dur)
    }
    // console.log(sched)
    return {type: SCHEDULE_TASKS, payload: sched}
}