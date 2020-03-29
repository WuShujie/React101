import { actionTypes } from '../utils/constant'
import { User } from '../types'

export interface IAddUserAction {
    type: string;
    user: User
}
export interface IDeleteUserAction {
    type: string;
    userId: string
}
export interface IRefreshUserAction {
    type: string;
    users: User[]
}
export interface IInitUserAction {
    type: string
}
export type UserAction = IAddUserAction & IDeleteUserAction & IRefreshUserAction & IInitUserAction

export function addUser(user: User): IAddUserAction {
    return {
        type: actionTypes.ADD_USER,
        user
    }
}

export function deleteUser(userId: string): IDeleteUserAction {
    return {
        type: actionTypes.DELETE_USER,
        userId
    }
}

export function refreshAllUsers(users: User[]): IRefreshUserAction {
    return {
        type: actionTypes.ALL_USERS,
        users
    }
}
export function initUsers(): IInitUserAction {
    return {
        type: actionTypes.INITIAL
    }
}
export function requestDelete(userId: string): IDeleteUserAction {
    return {
        type: actionTypes.DELETE_REQUEST,
        userId
    }
}
export function requestAdd(user: User): IAddUserAction {
    return {
        type: actionTypes.ADD_REQUEST,
        user
    }
}