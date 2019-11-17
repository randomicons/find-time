import {DateTime, Duration, Interval} from "luxon";

export type Task = {
    id: string, name: string, duration: Duration, deadline?: DateTime,
}

export interface Tasks {
    [id: string]: Task
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

export interface RawTask {
    name: string,
    id: string,
    duration: string,
    deadline?: string,
}

export interface STask {
    id: string,
    name: string,
    interval: Interval,
    deadline?: DateTime
}

export type TimerStates = "break" | "work" | "none"
