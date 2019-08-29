import {ADD_TASK_FAILED, ADD_TASK_SUCCESS, SCHEDULE_TASKS} from "../constants/action-constants"
import {STask} from "../components/Schedule";
import {Tasks} from '../components/ListTasks'

export interface MainState {
    tasks: Tasks
    schedTasks: Array<STask>
}

const initState: MainState = {tasks: {}, schedTasks: []}

function rootReducer(state: MainState = initState, action: any) {
    switch (action.type) {
        case ADD_TASK_SUCCESS:
            const {name} = action.payload
            return Object.assign({}, state, {tasks: {...state.tasks, [name]: action.payload}})
        case ADD_TASK_FAILED:
            console.log(action.error)
            break
        case SCHEDULE_TASKS:
            return Object.assign({}, state, {schedTasks: action.payload})
    }

    return state
}

export default rootReducer