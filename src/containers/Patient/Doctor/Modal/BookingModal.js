
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'reactstrap';
import _ from "lodash"
import ProfileDoctor from '../ProfileDoctor';
import './BookingModal.scss'

export class BookingModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }


    componentDidUpdate = async (prevProps, prevState, smapshot) => {

    }

    toggle = () => {
        this.props.toggle()
    }

    close = () => {
        this.props.closeBookingModale()
    }

    render() {
        let { dataTime } = this.props
        console.log("check dataTime", dataTime)
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
                                    <input className='form-control' />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Số điện thoại</label>
                                    <input className='form-control' />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Địa chỉ Email</label>
                                    <input className='form-control' />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Địa chỉ liên hệ</label>
                                    <input className='form-control' />
                                </div>
                                <div className='col-12 form-group'>
                                    <label>Lý do khám</label>
                                    <input className='form-control' />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Đặt cho ai</label>
                                    <input className='form-control' />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Giới tính</label>
                                    <input className='form-control' />
                                </div>
                            </div>
                        </div>
                        <div className='booking-modal-footer'>
                            <button className="btn-booking-confirm">Xác nhận</button>
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
})


const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal)