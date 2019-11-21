import {Event} from "../interfaces";
import {ADD_EVENT_SUCCESS} from "../constants/action";
import {Dispatch} from "redux";


export function addEvent(event: Event) {
    return (dispatch: Dispatch) => {
        return dispatch({type: ADD_EVENT_SUCCESS, payload: event})
    }
}

function transformEventForPost(event: Event) {
    return {
        id: event.id,
        name: event.name,
        duration: event.duration.toISO(),
        deadline: event.startTime.toISO()
    }
}
