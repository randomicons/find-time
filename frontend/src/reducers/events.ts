import {Action, Events, SEvent} from "../interfaces";
import {ADD_EVENT_SUCCESS} from "../constants/action";

const initState = {
    events: {},
    schedEvents: [],
}

export function events(state: { events: Events, schedEvents: SEvent[] } = initState, action: Action) {
    switch (action.type) {
        case ADD_EVENT_SUCCESS:
            let {id} = action.payload
            return Object.assign({}, state, {events: {...state.events, [id]: action.payload}})
    }
    return state
}
