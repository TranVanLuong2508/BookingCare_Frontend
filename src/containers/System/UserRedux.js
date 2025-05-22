import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { LANGUAGES } from '../../utils/constant'
import * as actions from '../../store/actions'
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import './UserRedux.scss'
export class UserRedux extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrGenders: [],
            arrRoles: [],
            arrPositions: [],
            previewImgURL: ''
        }
    }

    componentDidMount = () => {
        this.props.fetchGenderStart()
        this.props.fetchPositionStart()
        this.props.fetchRoleStart()
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (prevProps.genders !== this.props.genders) {
            this.setState({
                arrGenders: this.props.genders,
            })
        }
        if (prevProps.roles !== this.props.roles) {
            this.setState({
                arrRoles: this.props.roles
            })
        }
        if (prevProps.positions !== this.props.positions) {
            this.setState({
                arrPositions: this.props.positions,
            })
        }
    }

    handleChangeInputImg = (eventInputImg) => {
        let data = eventInputImg.target.files
        let file = data[0]
        if (file) {
            let ObjectImgUrl = URL.createObjectURL(file)
            this.setState({
                previewImgURL: ObjectImgUrl
            })
        }

    }

    handlePreviewImg = () => {
        Fancybox.bind("[data-fancybox]", {
            hideScrollbar: false,
        });
    }

    render() {

        let arrayGenderData = this.state.arrGenders
        let language = this.props.language
        let arrayRoleData = this.state.arrRoles
        let arrayPositionData = this.state.arrPositions
        let isLoadingGenderRedux = this.props.isLoadingGender
        let isLoadingPositionRedux = this.props.isLoadingPosition
        let isLoadingRoleRedux = this.props.isLoadingRole

        return (
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
                                <input className='form-control' type='email' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id={"manage-user.password"} />:</label>
                                <input className='form-control' type='password' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id={"manage-user.firstName"} />:</label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id={"manage-user.lastName"} />:</label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id={"manage-user.phoneNumber"} />:</label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id={"manage-user.address"} />:</label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id={"manage-user.gender"} />:</label>
                                <select className='form-control'>
                                    {arrayGenderData && arrayGenderData.length > 0 &&
                                        arrayGenderData.map((gender) => {
                                            return (
                                                <option key={gender.id}>
                                                    {language === LANGUAGES.VI ? gender.valueVi : gender.valueEn}
                                                </option>
                                            )
                                        })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id={"manage-user.position"} />:</label>
                                <select className='form-control'>
                                    {arrayPositionData && arrayPositionData.length > 0 &&
                                        arrayPositionData.map((position) => {
                                            return (
                                                <option key={position.id}>
                                                    {language === LANGUAGES.VI ? position.valueVi : position.valueEn}
                                                </option>
                                            )
                                        })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id={"manage-user.role"} />:</label>
                                <select className='form-control'>
                                    {arrayRoleData && arrayRoleData.length > 0 &&
                                        arrayRoleData.map((role) => {
                                            return (
                                                <option key={role.id}>
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
                                <button className='btn btn-primary '><FormattedMessage id={"manage-user.save"} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
    roles: state.admin.roles
})

const mapDispatchToProps = dispatch => {
    return {
        fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
        fetchPositionStart: () => dispatch(actions.fetchPositionStart()),
        fetchRoleStart: () => dispatch(actions.fetchRoleStart())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux)