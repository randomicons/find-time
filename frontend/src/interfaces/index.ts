import {DateTime, Duration, Interval} from "luxon";

export type Task = {
    id: string, name: string, duration: Duration, deadline?: DateTime,
}

export interface RawTask {
    name: string,
    id: string,
    duration: string,
    deadline?: string,
}

export interface Tasks {
    [id: string]: Task
}

export interface Event {
    id: string,
    name: string,
    duration: Duration,
    startTime: DateTime,
}

export interface Events {
    [id: string]: Event
}


// export interface MainState {
//     tasks: Tasks
//     events: Events
//     schedTasks: Array<STask>
//     loggedIn: boolean
//     opts: SchedOpts
// }

export interface Action {
    type: string,
    payload?: any,
    err?: string
}

export interface SchedOpts {
    startTime: DateTime,
    endTime: DateTime,
}

export interface STask {
    id: string,
    name: string,
    interval: Interval,
    deadline?: DateTime
}

export interface SEvent {
    id: string,
    name: string,
    interval: Interval,
}

export type TimerStates = "break" | "work" | "none"
