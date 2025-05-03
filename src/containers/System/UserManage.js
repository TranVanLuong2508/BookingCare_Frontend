import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { userService } from '../../services';
import ModalUser from './ModalUser';
import { emitter } from '../../utils';

import './UserManage.scss'

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false
        }
    }

    componentDidMount = async () => {
        await this.getAllUsers()
    }

    getAllUsers = async () => {
        let getAllUsersResult = await userService.getAllUsers('ALL')
        this.setState({
            arrUsers: getAllUsersResult.users
        })
    }

    handleClickButtonAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })
    }

    handleClickButtonDeleteUser = async (userToDelete) => {
        try {
            let deleteUserResult = await userService.deleteUser(userToDelete.id)
            if (deleteUserResult && deleteUserResult.errCode === 0) {
                this.getAllUsers()
                console.log(deleteUserResult.errMessage)
            } else {
                alert(deleteUserResult.errMessage)
            }
        } catch (error) {
            console.log(error)
        }
    }

    toggleModalUser = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }

    createNewUser = async (newUserData) => {
        try {
            let createNewUserResult = await userService.createNewUser(newUserData)
            if (createNewUserResult && createNewUserResult.errCode === 0) {
                this.getAllUsers()
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_USER_MODAL_DATA')
            } else {
                alert(createNewUserResult.errMessage)
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        let arrUsers = this.state.arrUsers
        return (
            <>
                <div className='container'>
                    <ModalUser
                        isOpen={this.state.isOpenModalUser}
                        toggle={this.toggleModalUser}
                        createNewUser={this.createNewUser}
                    />
                    <div className='row'>
                        <div className="text-center section-title">Manage users</div>
                    </div>
                    <div className='row'>
                        <button
                            className='btn btn-primary col-1'
                            onClick={() => { this.handleClickButtonAddNewUser() }}
                        >
                            <i className="fas fa-plus"></i>Add new user</button>
                    </div>
                    <div className='row'>
                        <table className="table table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {arrUsers && arrUsers.map((user, index) => {
                                    return (
                                        <tr key={user.id}>
                                            <td>{index + 1}</td>
                                            <td>{user.email}</td>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.address}</td>
                                            <td>
                                                <button className='btn-edit'><i className="fas fa-edit"></i></button>
                                                <button
                                                    className='btn-delete'
                                                    onClick={() => { this.handleClickButtonDeleteUser(user) }}
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);