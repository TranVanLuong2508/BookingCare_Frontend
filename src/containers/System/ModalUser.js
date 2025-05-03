import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils';
import './ModalUser.scss'

export class ModalUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
        this.listenToEmitter()
    }

    listenToEmitter = () => {
        emitter.on('EVENT_CLEAR_USER_MODAL_DATA', () => {
            this.resetFormAddNewUser()
        })
    }

    componentDidMount = () => {

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

    handleSubmitCreateNewUser = () => {
        let isValid = this.validateFormFields()
        if (isValid) {
            this.props.createNewUser(this.state)
        }
    }

    resetFormAddNewUser = () => {
        this.setState({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        })
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
                <ModalHeader toggle={() => { this.toggle() }}>Create a new User !</ModalHeader>
                <ModalBody>
                    <div className='modal-body'>
                        <div className='input-container'>
                            <label>Email:</label>
                            <input
                                type='email'
                                onChange={(event) => { this.handleOnChangeInput(event, "email") }}
                                value={this.state.email}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Passsword:</label>
                            <input
                                type='password'
                                onChange={(event) => { this.handleOnChangeInput(event, "password") }}
                                value={this.state.password}
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
                        onClick={() => { this.handleSubmitCreateNewUser() }}
                    >
                        Save
                    </Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>
                        Cancel
                    </Button>
                    <Button color="dark" className='px-3' onClick={() => { this.resetFormAddNewUser() }}>
                        Reset
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser)