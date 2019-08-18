//@flow
import {ADD_TASK, SCHEDULE_TASKS} from "../constants/action-constants"

const initialState = {
  tasks: {},
  schedTasks: []
}

function rootReducer(state: any = initialState, action: any) {
  if (action.type === ADD_TASK) {
    const {id} = action.payload
    return Object.assign({}, state, {tasks: {...state.tasks, [id]: action.payload}})
  } else if (action.type === SCHEDULE_TASKS) {
    return Object.assign({}, state, {schedTasks: action.payload})
  }

  return state
}

export default rootReducer