import React, { ChangeEvent, SyntheticEvent } from 'react'
import { User } from '../../types'
import { Dispatch } from 'redux'
import * as actions from '../../actions'
import { connect } from 'react-redux'
import './UserForm.css'
interface IState {
    first_name: string;
    last_name: string;
    gender: string;
    age: number;
    address: string
}
const mapDispatcherToProps = (dispach: Dispatch) => ({
    addUser: (user: User) => { dispach(actions.addUser(user)) },
    requestAddUser: (user: User) => { dispach(actions.requestAdd(user)) }
})

export type ReduxType = ReturnType<typeof mapDispatcherToProps>
export class UserForm extends React.Component<ReduxType, IState> {
    constructor(props: Readonly<{ addUser: (user: User) => void; requestAddUser: (user: User) => void }>) {
        super(props)
        this.state = {
            first_name: '', last_name: '', gender: 'Male', age: 0, address: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e: ChangeEvent<HTMLInputElement>) {
        switch (e.target.name) {
            case 'firstName':
                this.setState({ first_name: e.target.value })
                break
            case 'lastName':
                this.setState({ last_name: e.target.value })
                break
            case 'age':
                this.setState({ age: Number.parseInt(e.target.value) })
                break
            case 'gender':
                this.setState({ gender: e.target.value })
                break
            case 'address':
                this.setState({ address: e.target.value })
        }
    }

    handleSubmit(e: SyntheticEvent) {
        e.preventDefault()
        const addedUser = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            age: this.state.age,
            gender: this.state.gender,
            address: this.state.address
        }
        const { requestAddUser } = this.props
        requestAddUser(addedUser)
        this.setState({ first_name: '', last_name: '', gender: 'Male', age: 0, address: '' })
    }


    render() {
        return (
            <div className="user-form">
                <h1>Users</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name:</label>
                        <input id="firstName" name="firstName" className="form-control" value={this.state.first_name} onChange={this.handleChange}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input id="lastName" name="lastName" className="form-control" value={this.state.last_name} onChange={this.handleChange}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age:</label>
                        <input id="age" type="number" name="age" className="form-control" value={this.state.age} onChange={this.handleChange}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender">Gender:</label>
                        <div className="form-check">
                            <input id="genderMale" className="form-check-input" type="radio" name="gender" value="Male" checked={this.state.gender === 'Male'} onChange={this.handleChange}></input>
                            <label htmlFor="genderMale" className="form-check-label">Male</label>
                        </div>
                        <div className="form-check">
                            <input id="genderFemale" className="form-check-input" type="radio" name="gender" value="Female" checked={this.state.gender === 'Female'} onChange={this.handleChange}></input>
                            <label htmlFor="genderFemale" className="form-check-label">Femail</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input id="address" className="form-control" name="address" value={this.state.address} onChange={this.handleChange}></input>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Add User</button>
                </form>
            </div>
        )
    }
}

export default connect(null, mapDispatcherToProps)(UserForm)