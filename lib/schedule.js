//     
const {DateTime, Duration, Interval} = require('luxon')


                                                                      
                                                                                                       

class Task {
              
               
                     

  constructor(name        , dur          , deadline            = null) {
    this.name = name
    this.deadline = deadline
    this.dur = dur
    this.compareTo = (task      ) => {
      return this.dur.minus(task.dur).valueOf()
    }
  }

  static max(t1      , t2      ) {
    if (t1.compareTo(t2) < 0) {
      return t2
    } else
      return t1
  }
}

module.exports = {
  Task: Task,
  time: (tasks             , curTime          , opts           ) => {
    const {maxTaskTime, breakTime} = opts
    const sched               = []
    let curUsedTime = Duration.fromObject({})
    for (let val of tasks) {
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