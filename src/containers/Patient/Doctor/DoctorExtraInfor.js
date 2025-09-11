import { doctorService } from '../../../services'
import * as actions from '../../../store/actions/index'
import './DoctorExtraInfor.scss'
import NumberFormat from 'react-number-format';

import React, { Component } from 'react'
import { connect } from 'react-redux'

export class DoctorExtraInfor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isShowDetailPrice: false,
            extraInfor: ''
        }
    }

    handleHideShowPrice = () => {
        this.setState({
            isShowDetailPrice: !this.state.isShowDetailPrice
        })
    }

    componentDidUpdate = async (prevProps, prevState, smapshot) => {
        if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
            let res = await doctorService.getExtraInforDoctor(this.props.doctorIdFromParent)
            console.log('check res', res)
            this.setState({
                extraInfor: res.extraInfor
            })
        }
    }

    render() {
        let { isShowDetailPrice, extraInfor } = this.state
        return (
            <>
                <div className='doctor-extra-infor-container'>
                    <div className='content-up'>
                        <div className='text-address'>ĐỊA CHỈ KHÁM:</div>
                        <div className='name-clinic'>{extraInfor && extraInfor.clinicName ? extraInfor.clinicName : ''}</div>
                        <div className='detail-address'>{extraInfor && extraInfor.clinicAddress ? extraInfor.clinicAddress : ''}</div>
                    </div>
                    <div className='content-down'>
                        {isShowDetailPrice === false && (
                            <>
                                <div className='show-price'>
                                    <div className='short-infor'>
                                        GIÁ KHÁM:
                                        <NumberFormat
                                            className='currency'
                                            value={extraInfor && extraInfor.priceData ? extraInfor.priceData.valueVi : ''}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'VND'}
                                        />
                                    </div>
                                    <span className='detail' onClick={() => { this.handleHideShowPrice() }}>Xem chi tiết</span>
                                </div>
                            </>
                        )}
                        {isShowDetailPrice === true && (
                            <>
                                <div className='title-price'>
                                    GIÁ KHÁM:
                                </div>
                                <div className='detail-infor'>
                                    <div className='price'>
                                        <span className='left'>Giá khám</span>
                                        <span className='right'>
                                            <NumberFormat
                                                className='currency'
                                                value={extraInfor && extraInfor.priceData ? extraInfor.priceData.valueVi : ''}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'VND'}
                                            />
                                        </span>
                                    </div>
                                    <div className='note'>
                                        {extraInfor && extraInfor.note ? extraInfor.note : ''}
                                    </div>
                                </div>
                                <div className='payment'>Người bệnh thanh toán chi phí bằng hình thức:
                                    {extraInfor && extraInfor.paymentData ? extraInfor.paymentData.valueVi : ''}
                                </div>
                                <div className='hide-price'>
                                    <span className='detail' onClick={() => { this.handleHideShowPrice() }}>Ẩn bảng giá</span>
                                </div>

                            </>

                        )}


                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    language: state.app.language,
})


const mapDispatchToProps = dispatch => {
    return {
        getAllDoctors: () => dispatch(actions.fetchAllDoctor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor)