import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'

class TableUserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: []
        }
    }

    componentDidMount = () => {
        this.props.getAllUsers()
    }

    componentDidUpdate = (prevProps, prevState, snapshots) => {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                arrUsers: this.props.listUsers
            })
        }
    }

    handleClickDeleteUser = (userIdToDelete) => {
        this.props.deleteUser(userIdToDelete)
    }

    handleClickEditUser = (user) => {
        this.props.handleClickEditButton(user)
    }

    render() {
        let { arrUsers } = this.state

        return (
            <>
                <div className='container mt-5'>
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
                                {arrUsers && arrUsers.length > 0 && arrUsers.map((user, index) => {
                                    return (
                                        <tr key={user.id}>
                                            <td>{index + 1}</td>
                                            <td>{user.email}</td>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.address}</td>
                                            <td>
                                                <button
                                                    className='btn-edit'
                                                    onClick={() => { this.handleClickEditUser(user) }}
                                                >
                                                    <i className="fas fa-edit"></i>
                                                </button>
                                                <button
                                                    className='btn-delete'
                                                    onClick={() => { this.handleClickDeleteUser(user.id) }}
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
        listUsers: state.admin.listUsers
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllUsers: () => { dispatch(actions.fetchAllUserStart()) },
        deleteUser: (id) => { dispatch(actions.deleteUser(id)) }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUserRedux);