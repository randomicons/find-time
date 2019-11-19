import {
    ADD_TASK_FAILED,
    ADD_TASK_SUCCESS,
    CHANGE_TASK_DUR,
    CREATE_USER_FAILED,
    DEL_TASK_FAILED,
    DEL_TASK_SUCCESS,
    GET_TASKS_FAILED,
    GET_TASKS_SUCCESS,
    LOG_OFF,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    SCHEDULE_TASKS,
    UPDATE_TASK_SUCCESS
} from "../constants/action"
import {deleteCookie, getCookie} from "../util";
import {TOKEN} from '../constants/'
import {createDurMin, createTimeHour} from "../util/date-util";
import {MainState} from "../interfaces";
import {schedule} from "../actions/schedule";


const initState: MainState = {
    events: {}, tasks: {}, schedTasks: [], loggedIn: !!getCookie(TOKEN), opts: {
        startTime: createTimeHour(8),
        endTime: createTimeHour(23),
        breakTime: createDurMin(15),
        maxTaskTime: createDurMin(45)
    }
}

function rootReducer(state: MainState = initState, action: any) {
    switch (action.type) {
        case ADD_TASK_SUCCESS: {
            let {id} = action.payload
            return Object.assign({}, state, {tasks: {...state.tasks, [id]: action.payload}})
        }
        case GET_TASKS_SUCCESS:
            return Object.assign({}, state, {tasks: action.payload})
        case SCHEDULE_TASKS:
            return Object.assign({}, state, {schedTasks: action.payload})
        // case CREATE_USER_SUCCESS:
        //     return Object.assign({}, state, {loggedIn: true})
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {loggedIn: true})
        case LOG_OFF:
            deleteCookie(TOKEN)
            return Object.assign({}, state, {loggedIn: false})
        case DEL_TASK_SUCCESS: {
            let id = action.payload.id
            let newTasks = Object.assign({}, state.tasks)
            delete newTasks[id]
            return Object.assign({}, state, {
                tasks: newTasks,
                schedTasks: state.schedTasks.filter((val) => val.id !== id)
            })
        }
        case CHANGE_TASK_DUR: {
            const {id, duration} = action.payload
            state.tasks[id].duration = duration
            return Object.assign({}, state, {schedTasks: schedule(Object.values(state.tasks), state.opts).payload})
        }
        case UPDATE_TASK_SUCCESS: {
            const task = action.payload
            state.tasks[task.id] = task
            const {id, duration} = task
            state.tasks[id].duration = duration
            return Object.assign({}, state, {schedTasks: schedule(Object.values(state.tasks), state.opts).payload})
        }
        case CREATE_USER_FAILED:
        case LOGIN_FAILED:
        case GET_TASKS_FAILED:
        case DEL_TASK_FAILED:
        case ADD_TASK_FAILED:
            console.log(action.err)
            break
        default:
            console.log(action.err)

    }

    return state
}

export default rootReducer