import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { userService } from '../../services';

import './UserManage.scss'
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: []
        }
    }

    async componentDidMount() {
        let getAllUsersResult = await userService.getAllUsers('ALL')
        this.setState({
            arrUsers: getAllUsersResult.users
        })
    }

    render() {
        let arrUsers = this.state.arrUsers
        return (
            <>
                <div className='container'>
                    <div className='row'>
                        <div className="text-center section-title">Manage users</div>
                    </div>
                    <div className='row'>
                        <table class="table table table-striped table-hover">
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
                                        <>
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{user.email}</td>
                                                <td>{user.firstName}</td>
                                                <td>{user.lastName}</td>
                                                <td>{user.address}</td>
                                                <td>
                                                    <button className='btn-edit'><i class="fas fa-edit"></i></button>
                                                    <button className='btn-delete'><i class="fas fa-trash"></i></button>
                                                </td>
                                            </tr>
                                        </>
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
