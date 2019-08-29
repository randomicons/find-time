/**
 * Logs all actions and states after they are dispatched.
 */
import {Action, Dispatch, Store} from "redux";

export const logger = (store: Store) => (next: Dispatch) => (action: Action) => {
    console.group(action.type)
    console.info('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    console.groupEnd()
    return result
}

