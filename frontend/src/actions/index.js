//@flow
import {ADD_TASK, SCHEDULE_TASKS} from "../constants/action-constants"
import type {TaskType} from "../components/Task"
import type {SchedOpts, STask} from '../components/Schedule'
import {DateTime, Duration, Interval} from 'luxon'
import {createDurMin, createTimeHour} from "../util/date-util"

type PayloadAction = {
  type: string,
  payload: any
}

export function addTask(payload: TaskType) {
  return (dispatch: Function, getState: Function) => {
    dispatch(helperAddTask((payload)))
    const tasks: Array<TaskType> = (Object.values(getState().tasks): any)
    return dispatch(schedule(tasks, DateTime.local(), {
      startTime: createTimeHour(10),
      endTime: createTimeHour(23),
      breakTime: createDurMin(15),
      maxTaskTime: createDurMin(45)
    }))
  }
}

function helperAddTask(payload) {
  return {type: ADD_TASK, payload: payload}

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
    return deadA.valueOf().compareTo(deadB)
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
        id: val.id
      })
      curTime = curTime.plus(usedTime).plus(breakTime)
      curUsedTime = Duration.fromObject({})
    }
    sched.push({name: val.name, interval: Interval.after(curTime, dur), deadline: val.deadline, id: val.id})
    curUsedTime = curUsedTime.plus(dur)
    curTime = curTime.plus(dur)
  }
  console.log(sched)
  return {type: SCHEDULE_TASKS, payload: sched}
}

