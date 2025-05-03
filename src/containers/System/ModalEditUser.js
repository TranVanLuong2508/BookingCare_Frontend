import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from "lodash"
import './ModalUser.scss'

export class ModalEditUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
    }

    componentDidMount = () => {
        let userToEdit = this.props.currentUserToEdit
        if (userToEdit && !_.isEmpty(userToEdit)) {
            this.setState({
                id: userToEdit.id,
                email: userToEdit.email,
                password: "no pass password",
                firstName: userToEdit.firstName,
                lastName: userToEdit.lastName,
                address: userToEdit.address,
            })
        }
    }

    handleOnChangeInput = (event, fieldName) => {
        let copyState = { ...this.state }
        copyState[fieldName] = event.target.value
        this.setState({
            ...copyState
        })
    }

    validateFormFields = () => {
        let isValid = true
        let arrKeyInputValue = ['email', 'password', 'firstName', 'lastName', 'address']
        for (let i = 0; i < arrKeyInputValue.length; i++) {
            if (!this.state[arrKeyInputValue[i]]) {
                isValid = false
                alert('missing' + arrKeyInputValue[i])
                break
            }
        }
        return isValid
    }

    // handleSubmitCreateNewUser = () => {
    //     let isValid = this.validateFormFields()
    //     if (isValid) {
    //         this.props.createNewUser(this.state)
    //     }
    // }
    handleSubmitEditUser = () => {
        let isValid = this.validateFormFields()
        if (isValid) {
            this.props.editUser(this.state)
        }
    }

    toggle = () => {
        this.props.toggle()
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className='modal-user-container'
                size='lg'
            >
                <ModalHeader toggle={() => { this.toggle() }}>Edit User</ModalHeader>
                <ModalBody>
                    <div className='modal-body'>
                        <div className='input-container'>
                            <label>Email:</label>
                            <input
                                type='email'
                                onChange={(event) => { this.handleOnChangeInput(event, "email") }}
                                value={this.state.email}
                                disabled
                            />
                        </div>
                        <div className='input-container'>
                            <label>Passsword:</label>
                            <input
                                type='password'
                                onChange={(event) => { this.handleOnChangeInput(event, "password") }}
                                value={this.state.password}
                                disabled
                            />
                        </div>
                        <div className='input-container'>
                            <label>First Name:</label>
                            <input
                                type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, "firstName") }}
                                value={this.state.firstName}

                            />
                        </div>
                        <div className='input-container'>
                            <label>Last Name:</label>
                            <input
                                type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, "lastName") }}
                                value={this.state.lastName}
                            />
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address:</label>
                            <input
                                type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, "address") }}
                                value={this.state.address}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className='px-3'
                        onClick={() => { this.handleSubmitEditUser() }}
                    >
                        Save
                    </Button>{' '}
                    <Button
                        color="secondary"
                        className='px-3'
                        onClick={() => { this.toggle() }}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser)