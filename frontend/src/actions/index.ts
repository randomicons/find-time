import {ADD_TASK_FAILED, ADD_TASK_SUCCESS, SCHEDULE_TASKS} from "../constants/action-constants"
import {TaskType} from "../components/Task"
import {SchedOpts, STask} from '../components/Schedule'
import {DateTime, Duration, Interval} from 'luxon'
import {createDurMin, createTimeHour} from "../util/date-util"
import axios, {AxiosResponse} from 'axios'
import {AnyAction, Dispatch} from 'redux'
import {MainState} from "../reducers";
import {ThunkAction} from "redux-thunk";

type PayloadAction = {
    type: string,
    payload: any
}

export function addTask(task: TaskType): ThunkAction<Promise<any>, MainState, {}, AnyAction> {
    return (dispatch: Dispatch, getState: () => MainState) => {
        return axios.post('tasks/add', transformTaskForPost(task), {withCredentials: true})
            .then((res: AxiosResponse<{ err?: string }>) => {
                if (res.data.err) {
                    return dispatch({type: ADD_TASK_FAILED, err: res.data.err})
                }
                dispatch(helperAddTask(task))
                const tasks: Array<TaskType> = (Object.values(getState().tasks))
                return dispatch(schedule(tasks, DateTime.local(), {
                    startTime: createTimeHour(10),
                    endTime: createTimeHour(23),
                    breakTime: createDurMin(15),
                    maxTaskTime: createDurMin(45)
                }))
            }).catch(err => dispatch({type: ADD_TASK_FAILED, err: err}))
    }
}

function transformTaskForPost(task: TaskType) {
    return {taskId: task.name, duration: task.dur.toISO(), deadline: task.deadline ? task!.deadline.toISO() : null}
}

function helperAddTask(task: TaskType) {
    return {type: ADD_TASK_SUCCESS, payload: task}

}

export function schedule(tasks: Array<TaskType>, curTime: DateTime, opts: SchedOpts) {
    console.log(tasks)
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
            curTime = curTime.set({hour: startTime.hour, minute: 0, second: 0, millisecond: 0, day: startTime.day + 1})
        }
        let dur = val.dur
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
    console.log(sched)
    return {type: SCHEDULE_TASKS, payload: sched}
}

