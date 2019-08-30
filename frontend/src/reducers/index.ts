import {
    ADD_TASK_FAILED,
    ADD_TASK_SUCCESS,
    GET_TASKS_FAILED,
    GET_TASKS_SUCCESS,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    SCHEDULE_TASKS
} from "../constants/action"
import {getCookie} from "../util";
import {TOKEN} from '../constants/'
import {createDurMin, createTimeHour} from "../util/date-util";
import {MainState} from "../interfaces";


const initState: MainState = {
    tasks: {}, schedTasks: [], loggedIn: !!getCookie(TOKEN), opts: {
        startTime: createTimeHour(10),
        endTime: createTimeHour(23),
        breakTime: createDurMin(15),
        maxTaskTime: createDurMin(45)
    }
}

function rootReducer(state: MainState = initState, action: any) {
    switch (action.type) {
        case ADD_TASK_SUCCESS:
            const {name} = action.payload
            return Object.assign({}, state, {tasks: {...state.tasks, [name]: action.payload}})
        case GET_TASKS_SUCCESS:
            return Object.assign({}, state, {tasks: action.payload})
        case SCHEDULE_TASKS:
            return Object.assign({}, state, {schedTasks: action.payload})
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {loggedIn: true})
        case LOGIN_FAILED:
        case GET_TASKS_FAILED:
        case ADD_TASK_FAILED:
            console.log(action.err)
            break

    }

    return state
}

export default rootReducer