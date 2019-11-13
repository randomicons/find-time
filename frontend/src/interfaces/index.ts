import {DateTime, Duration, Interval} from "luxon";

export type Task = {
    name: string, duration: Duration, deadline?: DateTime,
}

export interface Tasks {
    [name: string]: Task
}

export interface MainState {
    tasks: Tasks
    schedTasks: Array<STask>
    loggedIn: boolean
    opts: SchedOpts
}

export interface SchedOpts {
    startTime: DateTime,
    endTime: DateTime,
    breakTime: Duration,
    maxTaskTime: Duration
}

export interface STask {
    name: string,
    interval: Interval,
    deadline?: DateTime
}

export type TimerStates = "break" | "work" | "none"
