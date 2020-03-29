import { deleteUser, addUser, initialUser } from './index'
import { actionTypes } from '../utils/constant'
import http from '../utils/request'
import { call, put } from 'redux-saga/effects'

describe('test saga', () => {
    test('delete user', async () => {
        const action = { type: actionTypes.DELETE_REQUEST, userId: '1' }
        const gen = deleteUser(action)
        expect(gen.next().value).toEqual(
            call(http.delete, 'http://localhost:8000/users/1'),
        )
        expect(gen.next().value).toEqual(
            put({
                type: actionTypes.DELETE_USER,
                userId: action.userId
            })
        )
    })

    test('add user', async () => {
        const user = {
            first_name: 'jason',
            last_name: 'wu',
            age: '25',
            gender: 'Male',
            address: 'address'
        }
        const action = { type: actionTypes.ADD_REQUEST, user: user }
        const gen = addUser(action)
        expect(gen.next().value).toEqual(
            call(http.post, 'http://localhost:8000/users', user)
        )
    })

    test('list users', async () => {
        const gen = initialUser()
        gen.next()
        expect(gen.next().value).toEqual(
            put({
                type: actionTypes.ALL_USERS
            })
        )
    })
})