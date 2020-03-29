import reducer from './userList.ts'
import { actionTypes } from '../utils/constant'
describe('test reducer', () => {
    test('list all user', () => {
        const user = {
            id: '1',
            first_name: 'jason',
            last_name: 'wu',
            age: '25',
            gender: 'Male',
            address: 'address'
        }
        const action = {
            type: actionTypes.ALL_USERS,
            users: [user]
        }
        expect(reducer([user], action)).toEqual([user])
    })
    test('add user', () => {
        const user = {
            id: '1',
            first_name: 'jason',
            last_name: 'wu',
            age: '25',
            gender: 'Male',
            address: 'address'
        }
        const action = {
            type: actionTypes.ADD_USER,
            user: user
        }
        expect(reducer([], action)).toEqual([user])
    })

    test('delete user', () => {
        const user = {
            id: 1,
            first_name: 'jason',
            last_name: 'wu',
            age: '25',
            gender: 'Male',
            address: 'address'
        }
        const initState = [user]
        const action = {
            type: actionTypes.DELETE_USER,
            userId: '1'
        }
        expect(reducer(initState, action)).toEqual([])
    })
})