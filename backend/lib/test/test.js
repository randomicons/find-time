const assert = require('assert')
const {DateTime, Duration, Interval} = require("luxon")
const sched = require('../schedule')
const Task = sched.Task

function createDur(mins) {
  return Duration.fromObject({minutes: mins})
}

describe("Schedule", () => {
  describe("Schedule", () => {
    it("Tasks should be scheduled but with ideal break times", () => {
      //Check that there is no continuous task of more than 45 mins
      const ints = sched.time([new Task('A', createDur(20)), new Task("B", createDur(30)),
          new Task("C", createDur(50)), new Task("D", createDur(60))], DateTime.local(0),
        {
          maxTaskTime: createDur(45),
          breakTime: createDur(15),
          startTime: DateTime.fromObject({hour: 0}),
          endTime: DateTime.fromObject({hour: 6})
        })
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
        const ints = sched.time([new Task('A', createDur(20)), new Task("B", createDur(30)),
            new Task("C", createDur(50)), new Task("D", createDur(60))], DateTime.fromObject({hour: 0}),
          {
            maxTaskTime: createDur(45),
            breakTime: createDur(15),
            startTime: DateTime.fromObject({hour: 0}),
            endTime: DateTime.fromObject({hour: 6})
          })

        const containingInt = Interval.fromDateTimes(DateTime.fromObject({hour: 0}), DateTime.fromObject({hour: 6}))
        for (const int of ints) {
          console.log(int.interval.toISO())
          assert(containingInt.engulfs(int.interval), int.name + " " + int.interval.toISO() + " is outside of " + containingInt.toISO())
        }
      }
    )

    it("Tasks should be done before the deadline", () => {
      const ints = sched.time([new Task('A', createDur(20)), new Task("B", createDur(30)),
          new Task("C", createDur(50)), new Task("D", createDur(60))], DateTime.fromObject({hour: 0}),
        {
          maxTaskTime: createDur(45),
          breakTime: createDur(15),
          startTime: DateTime.fromObject({hour: 0}),
          endTime: DateTime.fromObject({hour: 6})
        })

      for (const val of ints) {
        if (val.deadline)
          assert(val.interval.end <= val.deadline, ` deadline: ${val.deadline.toISO()} interval: ${val.interval.toISO()} ${val.name}`)
      }
    })
  })

})
