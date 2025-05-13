import React, { Component } from 'react'
import { connect } from 'react-redux'
import Slider from "react-slick";

import MedicalFacilityImg from '../../../assets/images/medical-facility/sunnycare.png'

export class MedicalFacility extends Component {
    render() {
        return (
            <div className='section-share section-medical_facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cơ sở y tế phổ biến</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='img-customize'>
                                <div className='img-custom'>
                                    <img src={MedicalFacilityImg} />
                                </div>
                                <div className='img-title'><span>Bệnh viên Trung ương</span></div>
                            </div>
                            <div className='img-customize'>
                                <div className='img-custom'>
                                    <img src={MedicalFacilityImg} />
                                </div>
                                <div className='img-title'><span>Bệnh viên Trung ương</span></div>
                            </div>
                            <div className='img-customize'>
                                <div className='img-custom'>
                                    <img src={MedicalFacilityImg} />
                                </div>
                                <div className='img-title'><span>Bệnh viên Trung ương</span></div>
                            </div>
                            <div className='img-customize'>
                                <div className='img-custom'>
                                    <img src={MedicalFacilityImg} />
                                </div>
                                <div className='img-title'><span>Bệnh viên Trung ương</span></div>
                            </div>
                            <div className='img-customize'>
                                <div className='img-custom'>
                                    <img src={MedicalFacilityImg} />
                                </div>
                                <div className='img-title'><span>Bệnh viên Trung ương</span></div>
                            </div>
                            <div className='img-customize'>
                                <div className='img-custom'>
                                    <img src={MedicalFacilityImg} />
                                </div>
                                <div className='img-title'><span>Bệnh viên Trung ương</span></div>
                            </div>

                        </Slider>
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)