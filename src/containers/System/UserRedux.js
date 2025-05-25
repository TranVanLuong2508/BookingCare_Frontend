import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { ACTIONS, LANGUAGES } from '../../utils/constant'
import * as actions from '../../store/actions'
import { Fancybox } from "@fancyapps/ui";
import TableUserRedux from './TableUserRedux'

import "@fancyapps/ui/dist/fancybox/fancybox.css";
import './UserRedux.scss'
export class UserRedux extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrGenders: [],
            arrRoles: [],
            arrPositions: [],
            previewImgURL: '',

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            role: '',
            position: '',
            avatar: '',

            action: ACTIONS.CREATE,
            userIdToEdit: ''
        }
    }

    componentDidMount = () => {
        this.props.fetchGenderStart()
        this.props.fetchPositionStart()
        this.props.fetchRoleStart()
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (prevProps.genders !== this.props.genders) {
            let arrGenders = this.props.genders
            this.setState({
                arrGenders: this.props.genders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ''
            })
        }
        if (prevProps.roles !== this.props.roles) {
            let arrRoles = this.props.roles
            this.setState({
                arrRoles: this.props.roles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : ''
            })
        }
        if (prevProps.positions !== this.props.positions) {
            let arrPositions = this.props.positions
            this.setState({
                arrPositions: this.props.positions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : ''
            })
        }

        if (prevProps.listUsers !== this.props.listUsers) { // reset formdata after creating user successfuly
            let arrGenders = this.props.genders
            let arrRoles = this.props.roles
            let arrPositions = this.props.positions

            this.setState({
                userIdToEdit: '',
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : '',
                avatar: '',

                action: ACTIONS.CREATE
            })
        }
    }

    handleChangeInputImg = (eventInputImg) => {
        let data = eventInputImg.target.files
        let file = data[0]
        if (file) {
            let ObjectImgUrl = URL.createObjectURL(file)
            this.setState({
                previewImgURL: ObjectImgUrl,
                avatar: file
            })
        }

    }

    handlePreviewImg = () => {
        Fancybox.bind("[data-fancybox]", {
            hideScrollbar: false,
        });
    }

    handleOnChangeInput = (event, fieldName) => {
        let copyState = { ...this.state }
        copyState[fieldName] = event.target.value
        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let arrFieldName = ["email", "password", "firstName", "lastName", "phoneNumber", "address"]
        let isValid = true
        for (let i = 0; i < arrFieldName.length; i++) {
            if (!this.state[arrFieldName[i]]) {
                isValid = false
                alert("Missing " + arrFieldName[i])
                break
            }
        }
        return isValid
    }

    handleClickEditButton = (updateData) => {
        this.setState({
            email: updateData.email,
            password: "HEARDCODE",
            firstName: updateData.firstName,
            lastName: updateData.lastName,
            address: updateData.address,
            phoneNumber: updateData.phoneNumber,
            gender: updateData.gender,
            role: updateData.roleId,
            position: updateData.positionId,
            action: ACTIONS.EDIT,
            userIdToEdit: updateData.id
        })
    }

    handleClickSubmnitButtonUser = () => {
        let isValidInput = this.checkValidateInput()
        if (isValidInput === true) {
            if (this.state.action === ACTIONS.CREATE) {
                this.props.createNewUser({
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    phoneNumber: this.state.phoneNumber,
                    gender: this.state.gender,
                    roleId: this.state.role,
                    positionId: this.state.position
                })
            } else if (this.state.action === ACTIONS.EDIT) {
                this.props.editUser({
                    id: this.state.userIdToEdit,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    phoneNumber: this.state.phoneNumber,
                    gender: this.state.gender,
                    roleId: this.state.role,
                    positionId: this.state.position
                })
            }
        }
    }

    render() {

        let arrayGenderData = this.state.arrGenders
        let language = this.props.language
        let arrayRoleData = this.state.arrRoles
        let arrayPositionData = this.state.arrPositions
        let isLoadingGenderRedux = this.props.isLoadingGender
        let isLoadingPositionRedux = this.props.isLoadingPosition
        let isLoadingRoleRedux = this.props.isLoadingRole

        let { email, password, firstName, lastName, address, phoneNumber, role, gender, position, action } = this.state

        return (
            <>
                <div className='user-redux-container'>
                    <div className='title'>
                        Use Redux to CRUD users
                    </div>
                    <div className='user-redux-body'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-12'><FormattedMessage id={"manage-user.add"} /></div>
                                <div className='col-12'>
                                    {isLoadingGenderRedux && isLoadingGenderRedux === true &&
                                        isLoadingPositionRedux === true && isLoadingRoleRedux &&
                                        isLoadingRoleRedux === true ?
                                        "Loading Gender Data" : ""
                                    }
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id={"manage-user.email"} />:</label>
                                    <input
                                        className='form-control'
                                        type='email'
                                        value={email}
                                        onChange={(event) => { this.handleOnChangeInput(event, "email") }}
                                        disabled={action === ACTIONS.CREATE ? false : true}
                                    />
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id={"manage-user.password"} />:</label>
                                    <input
                                        className='form-control'
                                        type='password'
                                        value={password}
                                        onChange={(event) => { this.handleOnChangeInput(event, "password") }}
                                        disabled={action === ACTIONS.CREATE ? false : true}
                                    />
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id={"manage-user.firstName"} />:</label>
                                    <input
                                        className='form-control'
                                        type='text'
                                        value={firstName}
                                        onChange={(event) => { this.handleOnChangeInput(event, "firstName") }}
                                    />
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id={"manage-user.lastName"} />:</label>
                                    <input
                                        className='form-control'
                                        type='text'
                                        value={lastName}
                                        onChange={(event) => { this.handleOnChangeInput(event, "lastName") }}
                                    />
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id={"manage-user.phoneNumber"} />:</label>
                                    <input
                                        className='form-control'
                                        type='text'
                                        value={phoneNumber}
                                        onChange={(event) => { this.handleOnChangeInput(event, "phoneNumber") }}
                                    />
                                </div>
                                <div className='col-9'>
                                    <label><FormattedMessage id={"manage-user.address"} />:</label>
                                    <input
                                        className='form-control'
                                        type='text'
                                        value={address}
                                        onChange={(event) => { this.handleOnChangeInput(event, "address") }}
                                    />
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id={"manage-user.gender"} />:</label>
                                    <select
                                        className='form-control'
                                        onChange={(event) => { this.handleOnChangeInput(event, "gender") }}
                                        value={gender}
                                    >
                                        {arrayGenderData && arrayGenderData.length > 0 &&
                                            arrayGenderData.map((gender) => {
                                                return (
                                                    <option key={gender.id} value={gender.key}>
                                                        {language === LANGUAGES.VI ? gender.valueVi : gender.valueEn}
                                                    </option>
                                                )
                                            })}
                                    </select>
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id={"manage-user.position"} />:</label>
                                    <select
                                        className='form-control'
                                        onChange={(event) => { this.handleOnChangeInput(event, "position") }}
                                        value={position}
                                    >
                                        {arrayPositionData && arrayPositionData.length > 0 &&
                                            arrayPositionData.map((position) => {
                                                return (
                                                    <option key={position.id} value={position.key}>
                                                        {language === LANGUAGES.VI ? position.valueVi : position.valueEn}
                                                    </option>
                                                )
                                            })}
                                    </select>
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id={"manage-user.role"} />:</label>
                                    <select
                                        className='form-control'
                                        value={role}
                                        onChange={(event) => { this.handleOnChangeInput(event, "role") }}
                                    >
                                        {arrayRoleData && arrayRoleData.length > 0 &&
                                            arrayRoleData.map((role) => {
                                                return (
                                                    <option key={role.id} value={role.key}>
                                                        {language === LANGUAGES.VI ? role.valueVi : role.valueEn}
                                                    </option>
                                                )
                                            })}
                                    </select>
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id={"manage-user.image"} />:</label>
                                    <div className='preview-img-container'>
                                        <input
                                            type='file'
                                            id='uploadImg'
                                            hidden
                                            onChange={(eventInputImg) => { this.handleChangeInputImg(eventInputImg) }}
                                        />
                                        <label
                                            htmlFor='uploadImg'
                                            className='label-upload'
                                        >
                                            <FormattedMessage id={"manage-user.upload"} /> <i className='fas fa-upload'></i>
                                        </label>
                                        {this.state.previewImgURL && (
                                            <div className='preview-img' onClick={() => { this.handlePreviewImg() }}>
                                                <a href={this.state.previewImgURL} data-fancybox data-caption="Avatar" data-width="800"
                                                    data-height="600">
                                                    <img src={this.state.previewImgURL} alt='' />
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className='col-12 mt-3'>
                                    <button
                                        className={`btn ${action === ACTIONS.CREATE ? "btn-primary" : "btn-danger"}`}
                                        onClick={() => { this.handleClickSubmnitButtonUser() }}
                                    >
                                        <FormattedMessage id={"manage-user.save"} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <TableUserRedux
                    handleClickEditButton={this.handleClickEditButton}
                />
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    language: state.app.language,
    genders: state.admin.genders,
    isLoadingGender: state.admin.isLoadingGender,
    isLoadingPosition: state.admin.isLoadingPosition,
    isLoadingRole: state.admin.isLoadingRole,
    positions: state.admin.positions,
    roles: state.admin.roles,
    listUsers: state.admin.listUsers
})

const mapDispatchToProps = dispatch => {
    return {
        fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
        fetchPositionStart: () => dispatch(actions.fetchPositionStart()),
        fetchRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (userData) => dispatch(actions.createNewUser(userData)),
        editUser: (updateData) => dispatch(actions.EditUser(updateData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux)