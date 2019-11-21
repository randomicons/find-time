import {
    ADD_TASK_FAILED,
    ADD_TASK_SUCCESS,
    CHANGE_TASK_DUR,
    DEL_TASK_FAILED,
    DEL_TASK_SUCCESS,
    GET_TASKS_FAILED,
    GET_TASKS_SUCCESS,
    SCHEDULE_TASKS,
    UPDATE_TASK_SUCCESS
} from "../constants/action"
import {Action, SchedOpts, STask, Tasks} from "../interfaces";
import {schedule} from "../actions/schedule";
import {createTimeHour} from "../util/date-util";

const initState = {
    tasks: {},
    schedTasks: [],
    opts: {
        startTime: createTimeHour(8),
        endTime: createTimeHour(23),
    }
}

export function tasks(state: { tasks: Tasks, schedTasks: STask[], opts: SchedOpts } = initState, action: Action) {
    switch (action.type) {
        case ADD_TASK_SUCCESS: {
            let {id} = action.payload
            return Object.assign({}, state, {tasks: {...state.tasks, [id]: action.payload}})
        }
        case GET_TASKS_SUCCESS:
            return Object.assign({}, state, {tasks: action.payload})
        case SCHEDULE_TASKS:
            return Object.assign({}, state, {schedTasks: action.payload})
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
        case GET_TASKS_FAILED:
        case DEL_TASK_FAILED:
        case ADD_TASK_FAILED:
            console.log(action.err)
            break
    }
    return state
}

