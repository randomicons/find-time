import {ADD_TASK_FAILED, ADD_TASK_SUCCESS, GET_TASKS_FAILED, GET_TASKS_SUCCESS} from "../constants/action"
import apiConstants from '../constants/api'
import axios, {AxiosResponse} from 'axios'
import {AnyAction, Dispatch} from 'redux'
import {ThunkAction} from "redux-thunk";
import {schedule} from "./schedule";
import {MainState, Tasks, TaskType} from "../interfaces";
import {DateTime, Duration} from "luxon";

interface ServerTask {
    [taskId: string]: { userId: string, taskId: string, duration: string, deadline?: string }
}

export function addTask(task: TaskType): ThunkAction<Promise<any>, MainState, {}, AnyAction> {
    return (dispatch: Dispatch, getState: () => MainState) => {
        return axios.post(apiConstants.TASKS_ADD, transformTaskForPost(task), {withCredentials: true})
            .then((res: AxiosResponse<{ err?: string }>) => {
                if (res.data.err) {
                    return dispatch({type: ADD_TASK_FAILED, err: res.data.err})
                }
                dispatch(addTaskSuccess(task))
                const tasks: Array<TaskType> = (Object.values(getState().tasks))
                return dispatch(schedule(tasks, getState().opts))
            }).catch(err => dispatch({type: ADD_TASK_FAILED, err}))
    }
}

export function getTasks(): ThunkAction<Promise<any>, MainState, {}, AnyAction> {
    return (dispatch: Dispatch, getState: () => MainState) => {
        return axios.get<ServerTask>(apiConstants.TASKS_GET, {withCredentials: true})
            .then(res => {
                const tasks = processTasks(res.data)
                dispatch({type: GET_TASKS_SUCCESS, payload: tasks})
                return dispatch(schedule(Object.values(tasks), getState().opts))
            }).catch(err => dispatch({type: GET_TASKS_FAILED, err}))
    }
}

function processTasks(tasks: ServerTask) {
    console.log(tasks)
    const newTasks: Tasks = {}
    for (const val of Object.values(tasks)) {
        newTasks[val.taskId] = {
            name: val.taskId,
            duration: Duration.fromISO(val.duration),
            deadline: val.deadline ? DateTime.fromISO(val.deadline) : undefined
        }
    }
    return newTasks
}

function transformTaskForPost(task: TaskType) {
    return {taskId: task.name, duration: task.duration.toISO(), deadline: task.deadline ? task!.deadline.toISO() : null}
}

function addTaskSuccess(task: TaskType) {
    return {type: ADD_TASK_SUCCESS, payload: task}
}

