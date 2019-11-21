import {Action} from "../interfaces";
import {CREATE_USER_FAILED, LOG_OFF, LOGIN_FAILED, LOGIN_SUCCESS} from "../constants/action";
import {deleteCookie} from "../util";
import {TOKEN} from "../constants";

export function users(state: { loggedIn: boolean } = {loggedIn: false}, action: Action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {loggedIn: true})
        case LOG_OFF:
            deleteCookie(TOKEN)
            return Object.assign({}, state, {loggedIn: false})
        case CREATE_USER_FAILED:
        case LOGIN_FAILED:
        default:
            console.log(action.err)
            return state
    }
}