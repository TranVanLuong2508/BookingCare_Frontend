import React, { Component } from 'react'
import { connect } from 'react-redux'
import Slider from "react-slick";

import OutstandingDoctorImg from '../../../assets/images/outstanding-doctor/Bs_noibat1.jpg'

export class OutstandingDoctor extends Component {
    render() {
        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Bác sĩ nổi bật tuần qua</span>
                        <button className='btn-section btn-background'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='img-customize img-doctor-customize'>
                                <div className='img-custom img-doctor'>
                                    <img src={OutstandingDoctorImg} />
                                </div>
                                <div className='img-title'><span>Bác sĩ 1</span></div>
                            </div>
                            <div className='img-customize img-doctor-customize'>
                                <div className='img-custom img-doctor'>
                                    <img src={OutstandingDoctorImg} />
                                </div>
                                <div className='img-title'><span>Bác sĩ 2</span></div>
                            </div>
                            <div className='img-customize img-doctor-customize'>
                                <div className='img-custom img-doctor'>
                                    <img src={OutstandingDoctorImg} />
                                </div>
                                <div className='img-title'><span>Bác sĩ 3</span></div>
                            </div>
                            <div className='img-customize img-doctor-customize'>
                                <div className='img-custom img-doctor'>
                                    <img src={OutstandingDoctorImg} />
                                </div>
                                <div className='img-title'><span>Bác sĩ 4</span></div>
                            </div>
                            <div className='img-customize img-doctor-customize'>
                                <div className='img-custom img-doctor'>
                                    <img src={OutstandingDoctorImg} />
                                </div>
                                <div className='img-title'><span>Bác sĩ 5</span></div>
                            </div>
                            <div className='img-customize img-doctor-customize'>
                                <div className='img-custom img-doctor'>
                                    <img src={OutstandingDoctorImg} />
                                </div>
                                <div className='img-title'><span>Bác sĩ 6</span></div>
                            </div>
                            <div className='img-customize img-doctor-customize'>
                                <div className='img-custom img-doctor'>
                                    <img src={OutstandingDoctorImg} />
                                </div>
                                <div className='img-title'><span>Bác sĩ 7</span></div>
                            </div>
                            <div className='img-customize img-doctor-customize'>
                                <div className='img-custom img-doctor'>
                                    <img src={OutstandingDoctorImg} />
                                </div>
                                <div className='img-title'><span>Bác sĩ 8</span></div>
                            </div>
                            <div className='img-customize img-doctor-customize'>
                                <div className='img-custom img-doctor'>
                                    <img src={OutstandingDoctorImg} />
                                </div>
                                <div className='img-title'><span>Bác sĩ 9</span></div>
                            </div>
                            <div className='img-customize img-doctor-customize'>
                                <div className='img-custom img-doctor'>
                                    <img src={OutstandingDoctorImg} />
                                </div>
                                <div className='img-title'><span>Bác sĩ 10</span></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor)