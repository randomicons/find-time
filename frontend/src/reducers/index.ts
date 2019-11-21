// import {MainState} from "../interfaces";
import {combineReducers} from "redux";
import {tasks} from "./tasks";
import {users} from "./users";
import {events} from "./events";


// export const initState: MainState = { events: {}, tasks: {}, schedTasks: [], loggedIn: !!getCookie(TOKEN), opts: {
//         startTime: createTimeHour(8),
//         endTime: createTimeHour(23),
//     }
// }

const rootReducer = combineReducers({users, tasks, events})
export default rootReducer
export type MainState = ReturnType<typeof rootReducer>
