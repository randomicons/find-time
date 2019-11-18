import {
    ADD_TASK_FAILED,
    ADD_TASK_SUCCESS,
    DEL_TASK_FAILED,
    DEL_TASK_SUCCESS,
    GET_TASKS_FAILED,
    GET_TASKS_SUCCESS,
    UPDATE_TASK_FAIL,
    UPDATE_TASK_SUCCESS
} from "../constants/action"
import apiConstants from '../constants/api'
import axios, {AxiosResponse} from 'axios'
import {AnyAction, Dispatch} from 'redux'
import {ThunkAction} from "redux-thunk";
import {schedule} from "./schedule";
import {MainState, RawTask, Task, Tasks} from "../interfaces";
import {DateTime, Duration} from "luxon";


export function deleteTask(task: Task) {
    return (dispatch: Dispatch) => {
        return axios.post(apiConstants.TASKS_DELETE, transformTaskForPost(task), {withCredentials: true})
            .then(res => {
                    if (res.data.err) {
                        return dispatch({type: DEL_TASK_FAILED, err: res.data.err})
                    }
                    return dispatch({type: DEL_TASK_SUCCESS, payload: task})
                }
            )
    }
}

export function updateTask(task: Task) {
    return (dispatch: Dispatch) => {
        return axios.post(apiConstants.TASKS_UPDATE, transformTaskForPost(task), {withCredentials: true})
            .then(res => {
                    if (res.data.err) {
                        return dispatch({type: UPDATE_TASK_FAIL, err: res.data.err})
                    }
                    return dispatch({type: UPDATE_TASK_SUCCESS, payload: task})
                }
            )
    }
}

export function addTask(task: Task): ThunkAction<Promise<any>, MainState, {}, AnyAction> {
    return (dispatch: Dispatch, getState: () => MainState) => {
        return axios.post(apiConstants.TASKS_ADD, transformTaskForPost(task), {withCredentials: true})
            .then((res: AxiosResponse<{ err?: string }>) => {
                if (res.data.err) {
                    return dispatch({type: ADD_TASK_FAILED, err: res.data.err})
                }
                dispatch(addTaskSuccess(task))
                const tasks: Array<Task> = (Object.values(getState().tasks))
                return dispatch(schedule(tasks, getState().opts))
            }).catch(err => dispatch({type: ADD_TASK_FAILED, err}))
    }
}

export function getTasks(): ThunkAction<Promise<any>, MainState, {}, AnyAction> {
    return (dispatch: Dispatch, getState: () => MainState) => {
        return axios.get<RawTask[]>(apiConstants.TASKS_GET, {withCredentials: true})
            .then(res => {
                const tasks = processTasks(res.data)
                dispatch({type: GET_TASKS_SUCCESS, payload: tasks})
                return dispatch(schedule(Object.values(tasks), getState().opts))
            }).catch(err => dispatch({type: GET_TASKS_FAILED, err}))
    }
}

function processTasks(tasks: RawTask[]) {
    console.log(tasks)
    const newTasks: Tasks = {}
    for (const val of tasks) {
        newTasks[val.id] = {
            id: val.id,
            name: val.name,
            duration: Duration.fromISO(val.duration),
            deadline: val.deadline ? DateTime.fromISO(val.deadline) : undefined
        }
    }
    return newTasks
}

function transformTaskForPost(task: Task) {
    return {
        id: task.id,
        name: task.name,
        duration: task.duration.toISO(),
        deadline: task.deadline ? task!.deadline.toISO() : null
    }
}

function addTaskSuccess(task: Task) {
    return {type: ADD_TASK_SUCCESS, payload: task}
}

