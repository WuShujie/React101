import { actionTypes } from '../utils/constant'
import * as actions from '../actions'
import { takeEvery, call, put, spawn, take } from 'redux-saga/effects'
import http from '../utils/request'
import api from '../api/API'
import axios from 'axios'

export function* initialUser() {
    const p = async function () {
        const res = await axios.get(api.ALL_USER)
        if (res.status === 200) {
            return res.data
        }
        else {
            return []
        }
    }
    const res = yield call(p)
    yield put({
        type: actionTypes.ALL_USERS,
        users: res
    })
}

export function* deleteUser(action: actions.UserAction) {
    yield call(http.delete, `${api.ALL_USER}/${action.userId}`)
    
    yield put({
        type: actionTypes.DELETE_USER,
        userId: action.userId
    })
}

export function* addUser(action: actions.UserAction){
    const res = yield call(http.post, api.ALL_USER, action.user)

    yield put({
        type: actionTypes.ADD_USER,
        user: res.data
    })
}

function* initUserSaga() {
    yield takeEvery(actionTypes.INITIAL, initialUser)
}
function* deleteUserSaga() {
    while (true) {
        const action = yield take(actionTypes.DELETE_REQUEST)
        yield call(deleteUser, action)
    }
}
function* addUserSaga(){
    while(true){
        const action = yield take(actionTypes.ADD_REQUEST)
        yield call(addUser, action)
    }
}

function* rootSaga() {
    yield spawn(initUserSaga)
    yield spawn(deleteUserSaga)
    yield spawn(addUserSaga)
}

export default rootSaga