import { actionTypes } from '../utils/constant'
import { User } from '../types'
import { UserAction } from '../actions'

const userList = (state: User[] = [], action: UserAction): User[] => {
    switch (action.type) {
        case actionTypes.ADD_USER:
            return [
                ...state,
                action.user
            ]
        case actionTypes.DELETE_USER:
            return state.filter(user => user.id !== Number.parseInt(action.userId))
        case actionTypes.ALL_USERS:
            return [
                ...action.users
            ]
        default:
            return state
    }
}

export default userList