import {
    ADD_EVENT_FAILED,
    ADD_EVENT_SUCCESS,
    DEL_EVENT_FAILED,
    DEL_EVENT_SUCCESS,
    GET_EVENTS_FAILED,
    GET_EVENTS_SUCCESS,
    UPDATE_EVENT_FAIL,
    UPDATE_EVENT_SUCCESS
} from "../constants/action"
import apiConstants from '../constants/api'
import axios, {AxiosResponse} from 'axios'
import {AnyAction, Dispatch} from 'redux'
import {ThunkAction} from "redux-thunk";
import {schedule} from "./schedule";
import {Event, Events, RawEvent} from "../interfaces";
import {DateTime, Duration} from "luxon";
import {MainState} from "../reducers";


export function deleteEvent(event: Event) {
    return (dispatch: Dispatch, getState: () => MainState) => {
        return axios.post(apiConstants.EVENTS_DELETE, transformEventForPost(event), {withCredentials: true})
            .then(res => {
                    if (res.data.err) {
                        return dispatch({type: DEL_EVENT_FAILED, err: res.data.err})
                    }
                    dispatch({type: DEL_EVENT_SUCCESS, payload: event})
                    return dispatch({type: UPDATE_EVENT_SUCCESS, payload: event})
                }
            )
    }
}

function updateSchedule(dispatch: Dispatch, getState: () => MainState) {
    const tasks = (Object.values(getState().tasks.tasks))
    return dispatch(schedule(tasks, getState().tasks.opts))
}

export function updateEvent(event: Event) {
    return (dispatch: Dispatch, getState: () => MainState) => {
        return axios.post(apiConstants.EVENTS_UPDATE, transformEventForPost(event), {withCredentials: true})
            .then(res => {
                    if (res.data.err) {
                        dispatch({type: UPDATE_EVENT_FAIL, err: res.data.err})
                        return updateSchedule(dispatch, getState)
                    }
                    return dispatch({type: UPDATE_EVENT_SUCCESS, payload: event})
                }
            )
    }
}

export function addEvent(event: Event) {
    return (dispatch: Dispatch, getState: () => MainState) => {
        return axios.post(apiConstants.EVENTS_ADD, transformEventForPost(event), {withCredentials: true})
            .then((res: AxiosResponse<{ err?: string }>) => {
                if (res.data.err) {
                    return dispatch({type: ADD_EVENT_FAILED, err: res.data.err})
                }
                dispatch({type: ADD_EVENT_SUCCESS, payload: event})
                return updateSchedule(dispatch, getState)
            }).catch(err => dispatch({type: ADD_EVENT_FAILED, err}))
    }
}

export function getEvents(): ThunkAction<Promise<any>, MainState, {}, AnyAction> {
    return (dispatch: Dispatch, getState: () => MainState) => {
        return axios.get<RawEvent[]>(apiConstants.EVENTS_GET, {withCredentials: true})
            .then(res => {
                const events = processEvents(res.data)
                dispatch({type: GET_EVENTS_SUCCESS, payload: events})
                const tasks = (Object.values(getState().tasks.tasks))
                return dispatch(schedule(tasks, getState().tasks.opts))
            }).catch(err => dispatch({type: GET_EVENTS_FAILED, err}))
    }
}

function processEvents(events: RawEvent[]) {
    console.log(events)
    const newEvents: Events = {}
    for (const val of events) {
        newEvents[val.id] = {
            id: val.id,
            name: val.name,
            duration: Duration.fromISO(val.duration),
            startTime: DateTime.fromISO(val.startTime)
        }
    }
    return newEvents
}

function transformEventForPost(event: Event) {
    return {
        id: event.id,
        name: event.name,
        duration: event.duration.toISO(),
        startTime: event.startTime.toISO()
    }
}

