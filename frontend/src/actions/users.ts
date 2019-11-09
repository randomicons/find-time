import {DateTime} from "luxon";
import axios from 'axios'
import {Dispatch} from "redux";
import {CREATE_USER_FAILED, LOGIN_FAILED, LOGIN_SUCCESS} from "../constants/action";

export function createUser(email: string, password: string) {
    return (dispatch: Dispatch) => axios.post('/users/create', {
        email, dateCreated: DateTime.local().toISO(), password
    }).then(() => {
        return dispatch<any>(login(email, password))
    }).catch(err => dispatch({type: CREATE_USER_FAILED, err}))
}

export function login(email: string, password: string) {
    return (dispatch: Dispatch) => {
        return axios.post('/users/login', {email, password})
            .then(res => {
                dispatch({type: LOGIN_SUCCESS, payload: res.data})
            }).catch(err => dispatch({type: LOGIN_FAILED, err}))
    }
}
