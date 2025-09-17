
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'reactstrap';
import _ from "lodash"
import Select from 'react-select';
import DatePicker from '../../../../components/Input/DatePicker'
import * as actions from '../../../../store/actions/index'
import { userService } from '../../../../services';
import ProfileDoctor from '../ProfileDoctor';
import './BookingModal.scss'
import { LANGUAGES } from '../../../../utils';
import { toast } from 'react-toastify';

export class BookingModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fullName: "",
            phoneNumber: "",
            email: "",
            address: "",
            reason: "",
            birthday: "",
            doctorId: "",
            timeType: "",

            arrGenders: [],
            selectedGender: "",

        }
    }


    componentDidMount = () => {
        this.props.fetchGender()
    }

    componentDidUpdate = async (prevProps, prevState, smapshot) => {

        if ((prevProps.genders !== this.props.genders) ||
            (this.props.language !== prevProps.language)) {
            let genderOtions = this.props.genders
            this.setState({
                arrGenders: this.buildDataGenderForSelect(genderOtions)
            })
        }

        if ((prevState.arrGenders !== this.state.arrGenders) ||
            (this.props.language !== prevProps.language)) {
            let arrGenders = this.state.arrGenders
            this.setState({
                selectedGender: arrGenders && arrGenders.length > 0 ? arrGenders[0] : {},
            })
        }

        if (prevProps.dataTime !== this.props.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId
                let timeType = this.props.dataTime.timeType
                this.setState({
                    timeType: timeType,
                    doctorId: doctorId
                })
            }
        }
    }

    toggle = () => {
        this.props.toggle()
    }

    close = () => {
        this.props.closeBookingModale()
    }

    handleOnChangeValue = (event, fieldName) => {
        let fieldValue = event.target.value
        let copyState = { ...this.state }
        copyState[fieldName] = fieldValue
        this.setState({
            ...copyState
        })
    }

    handleChangeSelect = (selectedGenderOption) => {
        this.setState({
            selectedGender: selectedGenderOption
        })
    }

    handleOnChangeDatePicker = (date) => {
        console.log('chek date', date)
        console.log("check current day", this.state.birthday)
        this.setState({
            birthday: date[0]
        })
    }

    buildDataGenderForSelect = (arrGenders) => {
        let result = []
        let language = this.props.language
        if (arrGenders && arrGenders.length > 0) {
            arrGenders.map((gender) => {
                let object = {}
                object.label = language === LANGUAGES.VI ? gender.valueVi : gender.valueEn
                object.value = gender.keyMap

                result.push(object)
            })
        }
        return result
    }

    handleConfirmBooking = async () => {

        // (!data.email || !data.doctorId || !data.date || !data.timeType
        let date = new Date(this.state.birthday).getTime()
        let bookingResponse = await userService.patientBookingAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: date,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            selectedGender: this.state.selectedGender.value
        })
        if (bookingResponse && bookingResponse.errCode === 0) {
            toast.success("Booking new appointment succeed")
            this.close()
        } else {
            toast.error("Booking new appointment error")
        }

    }

    render() {
        let { dataTime } = this.props
        console.log("check state before confirn", this.state)
        let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : ""
        return (
            <>
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={() => { this.toggle() }}
                    className='booking-modal-container'
                    size='lg'
                    centered
                >
                    <div className='booking-modal-content'>
                        <div className='booking-modal-header'>
                            <span className='left'>Thông tin đặt lịch khám bệnh</span>
                            <span
                                className='right'
                                onClick={() => { this.close() }}
                            >
                                <i
                                    className='fas fa-times'>
                                </i>
                            </span>
                        </div>
                        <div className='booking-modal-body'>
                            {/* {JSON.stringify(dataTime)} */}
                            <div className='doctor-infor'>
                                <ProfileDoctor
                                    doctorId={doctorId}
                                    isShowDoctorDescription={false}
                                    dataTime={dataTime}
                                />
                            </div>
                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label>Họ tên</label>
                                    <input
                                        className='form-control'
                                        onChange={(event) => { this.handleOnChangeValue(event, "fullName") }}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Số điện thoại</label>
                                    <input
                                        className='form-control'
                                        onChange={(event) => { this.handleOnChangeValue(event, "phoneNumber") }}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Địa chỉ Email</label>
                                    <input
                                        className='form-control'
                                        onChange={(event) => { this.handleOnChangeValue(event, "email") }}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Địa chỉ liên hệ</label>
                                    <input
                                        className='form-control'
                                        onChange={(event) => { this.handleOnChangeValue(event, "address") }}
                                    />
                                </div>
                                <div className='col-12 form-group'>
                                    <label>Lý do khám</label>
                                    <input
                                        className='form-control'
                                        onChange={(event) => { this.handleOnChangeValue(event, "reason") }}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Ngày sinh</label>
                                    <DatePicker
                                        onChange={this.handleOnChangeDatePicker}
                                        className="form-control"
                                        value={this.state.birthday}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Giới tính</label>
                                    <Select
                                        value={this.state.selectedGender}
                                        onChange={this.handleChangeSelect}
                                        options={this.state.arrGenders}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='booking-modal-footer'>
                            <button className="btn-booking-confirm"
                                onClick={() => this.handleConfirmBooking()}
                            >Xác nhận</button>
                            <button
                                className="btn-booking-cancel"
                                onClick={() => { this.close() }}
                            >
                                Hủy
                            </button>
                        </div>
                    </div>

                </Modal>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    language: state.app.language,
    genders: state.admin.genders,

})


const mapDispatchToProps = dispatch => {
    return {
        fetchGender: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal)