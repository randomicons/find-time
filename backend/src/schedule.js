//@flow
const {DateTime, Duration, Interval} = require('luxon')


type Sched = { name: string, interval: Interval, deadline: ?DateTime }
type SchedOpts = { startTime: DateTime, endTime: DateTime, maxTaskTime: Duration, breakTime: Duration }

class Task {
  name: string
  dur: Duration
  deadline: ?DateTime

  constructor(name: string, dur: Interval, deadline: ?DateTime = null) {
    this.name = name
    this.deadline = deadline
    this.dur = dur
    this.compareTo = (task: Task) => {
      return this.dur.minus(task.dur).valueOf()
    }
  }

  static max(t1: Task, t2: Task) {
    if (t1.compareTo(t2) < 0) {
      return t2
    } else
      return t1
  }
}

function compareTime(d1: DateTime, d2: DateTime) {
  return d1.valueOf().compareTo(d2)
}

module.exports = {
  Task: Task,
  time: (tasks: Array<Task>, curTime: DateTime, opts: SchedOpts) => {
    const {maxTaskTime, breakTime, endTime, startTime} = opts
    // Currently only support hour and not minutes for start and end times
    if (curTime.hour < startTime.hour) {
      curTime = curTime.set({hour: startTime.hour})
    }

    // Sort by deadline
    tasks.sort((a, b) => {
      a = a.deadline
      b = b.deadline
      if (a == null && b == null) return 0
      if (b == null) return -1
      if (a == null) return 1
      return a.valueOf().compareTo(b)
    })
    const sched: Array<Sched> = []
    let curUsedTime = Duration.fromObject({})
    for (let val of tasks) {
      if (curTime.hour === endTime.hour) {
        curTime = curTime.set({hour: startTime.hour, day: startTime.day + 1})
      }
      let dur = val.dur
      while (curUsedTime.plus(dur).minus(maxTaskTime).valueOf() >= 0) {
        const usedTime = maxTaskTime.minus(curUsedTime)
        dur = dur.minus(usedTime)
        sched.push({
          name: val.name,
          interval: Interval.after(curTime, usedTime),
          deadline: val.deadline
        })
        curTime = curTime.plus(usedTime).plus(breakTime)
        curUsedTime = Duration.fromObject({})
      }
      sched.push({name: val.name, interval: Interval.after(curTime, dur), deadline: val.deadline})
      curUsedTime = curUsedTime.plus(dur)
      curTime = curTime.plus(dur)
    }
    return sched
  }
}