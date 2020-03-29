import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { User } from '../../types'
import * as actions from '../../actions'
import 'bootstrap/dist/css/bootstrap.css'

interface IStateProps {
    userList: User[]
}
interface IDispacherProps {
    deleteUser: (userId: string) => void;
    refreshUser: (users: User[]) => void;
    initUser: () => void;
    requestDelete: (userId: string) => void
}

const mapStateToProps = (state: IStateProps): { users: User[] } => ({
    users: state.userList
})
const mapDispatcherToProps = (dispach: Dispatch): IDispacherProps => ({
    deleteUser: (userId) => dispach(actions.deleteUser(userId)),
    refreshUser: (users) => dispach(actions.refreshAllUsers(users)),
    initUser: () => dispach(actions.initUsers()),
    requestDelete: (userId) => dispach(actions.requestDelete(userId))
})

export type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>
export class UserList extends React.Component<ReduxType>{
    componentDidMount() {
        /** just react-redux */
        // const { refreshUser } = this.props
        // http.get(api.ALL_USER)
        //     .then(res => {
        //         res.status === 200 && refreshUser(res.data)
        //     })
        //     .catch(err => {
        //         console.error(err)
        //     })

        /** using redux-saga */
        const { initUser } = this.props
        initUser()
    }

    handleDelUser(userId: string) {
        /** just react-redux */
        // const { deleteUser } = this.prop
        // http.delete(`${api.ALL_USER}/${userId}`)
        //     .then(res => {
        //         res.status === 200 && deleteUser(userId)
        //     })
        //     .catch(err => {
        //         console.error(err)
        //     })

        /** using redux-saga */
        const { requestDelete } = this.props
        requestDelete(userId)
    }
    render() {
        const { users } = this.props

        return (
            <table className="table table-bordered">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Age</th>
                        <th scope="col">Address</th>
                        <th scope="col">Operation</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user => {
                        return (
                            // eslint-disable-next-line jsx-a11y/aria-role
                            <tr className="text-center" key={user.id} role="tableRow">
                                <td>{user.id}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.gender}</td>
                                <td>{user.age}</td>
                                <td>{user.address}</td>
                                <td>
                                    <button name={user.id ? user.id.toString() : ''} type="button" className="btn btn-danger" data-testid={'del_' + user.id} onClick={e => this.handleDelUser(e.currentTarget.name)}>
                                        Delete
                                </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }
}
export default connect(mapStateToProps, mapDispatcherToProps)(UserList)