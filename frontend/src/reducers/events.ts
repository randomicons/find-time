import {
    ADD_EVENT_FAILED,
    ADD_EVENT_SUCCESS,
    CHANGE_EVENT_DUR,
    DEL_EVENT_FAILED,
    DEL_EVENT_SUCCESS,
    GET_EVENTS_FAILED,
    GET_EVENTS_SUCCESS,
    SCHEDULE_EVENTS,
    UPDATE_EVENT_SUCCESS
} from "../constants/action"
import {Action, Events, SEvent} from "../interfaces";
import {scheduleEvents} from "../actions/schedule";

const initState = {
    events: {},
    schedEvents: [],
}

export function events(state: { events: Events, schedEvents: SEvent[] } = initState, action: Action) {
    switch (action.type) {
        case ADD_EVENT_SUCCESS: {
            let {id} = action.payload
            return Object.assign({}, state, {events: {...state.events, [id]: action.payload}})
        }
        case GET_EVENTS_SUCCESS:
            return Object.assign({}, state, {events: action.payload})
        case SCHEDULE_EVENTS:
            return Object.assign({}, state, {schedEvents: action.payload})
        case DEL_EVENT_SUCCESS: {
            let id = action.payload.id
            let newEvents = Object.assign({}, state.events)
            delete newEvents[id]
            return Object.assign({}, state, {
                events: newEvents,
                schedEvents: state.schedEvents.filter((val) => val.id !== id)
            })
        }
        case CHANGE_EVENT_DUR: {
            const {id, duration} = action.payload
            state.events[id].duration = duration
            return Object.assign({}, state, {schedEvents: scheduleEvents(Object.values(state.events)).payload})
        }
        case UPDATE_EVENT_SUCCESS: {
            const event = action.payload
            state.events[event.id] = event
            const {id, duration} = event
            state.events[id].duration = duration
            return Object.assign({}, state, {schedEvents: scheduleEvents(Object.values(state.events)).payload})
        }
        case GET_EVENTS_FAILED:
        case DEL_EVENT_FAILED:
        case ADD_EVENT_FAILED:
            console.log(action.err)
            break
    }
    return state
}

