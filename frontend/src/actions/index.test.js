const assert = require('assert')
const {DateTime, Duration, Interval} = require("luxon")
const sched = require('./index').schedule

function createDur(mins) {
  return Duration.fromObject({minutes: mins})
}

class Task {
  constructor(name, dur, deadline) {
    this.name = name
    this.dur = dur
    this.deadline = deadline
  }
}


describe("Schedule", () => {
  describe("Schedule", () => {
    it("Tasks should be scheduled but with ideal break times", () => {
      //Check that there is no continuous task of more than 45 mins
      const ints = sched([new Task('A', createDur(20)), new Task("B", createDur(30)),
          new Task("C", createDur(50)), new Task("D", createDur(60))], DateTime.local(),
        {
          maxTaskTime: createDur(45),
          breakTime: createDur(15),
          startTime: DateTime.fromObject({hour: 0}),
          endTime: DateTime.fromObject({hour: 6})
        }).payload
      let prevInt = ints[0].interval
      for (const val of ints.slice(1)) {
        console.log(val.interval.toISO())
        console.log(val.name + ' ' + prevInt.toDuration().as("minutes"))
        if (prevInt.abutsStart(val.interval)) {
          prevInt = prevInt.union(val.interval)
        } else {
          assert(prevInt.toDuration().as("minutes") <= 45, val.name + " task was more than 45 mins continuous")
          prevInt = val.interval
        }
      }
    })

    it("Tasks shouldn't go past the days time limits", () => {
        const startTime = 8
        const endTime = 23
        const ints = sched([new Task('A', createDur(20)), new Task("B", createDur(30)),
            new Task("C", createDur(50)), new Task("D", createDur(60))], DateTime.local(),
          {
            maxTaskTime: createDur(45),
            breakTime: createDur(15),
            startTime: DateTime.fromObject({hour: startTime}),
            endTime: DateTime.fromObject({hour: endTime})
          }).payload

        const containingInt = Interval.fromDateTimes(DateTime.fromObject({hour: 0}), DateTime.fromObject({hour: 6}))
        for (const val of ints) {
          console.log(val.interval.toISO())
          assert(val.interval.start.hour >= startTime && val.interval.end.hour < endTime,
            val.name + " " + val.interval.toISO() + " is outside of " + containingInt.toISO())
        }
      }
    )

    it("Tasks should be done before the deadline", () => {
      const ints = sched([new Task('A', createDur(20)), new Task("B", createDur(30)),
          new Task("C", createDur(50)), new Task("D", createDur(60))], DateTime.fromObject({hour: 0}),
        {
          maxTaskTime: createDur(45),
          breakTime: createDur(15),
          startTime: DateTime.fromObject({hour: 0}),
          endTime: DateTime.fromObject({hour: 6})
        }).payload

      for (const val of ints) {
        if (val.deadline)
          assert(val.interval.end <= val.deadline, ` deadline: ${val.deadline.toISO()} interval: ${val.interval.toISO()} ${val.name}`)
      }
    })
  })

})
