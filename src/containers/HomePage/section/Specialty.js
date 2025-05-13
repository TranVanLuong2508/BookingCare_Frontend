import React, { Component } from 'react'
import { connect } from 'react-redux'
import Slider from "react-slick";

import specialtyImg from '../../../assets/images/specialty/co-xuong-khop.png'

export class Specialty extends Component {
    render() {
        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Chuyên khoa phổ biến</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='img-customize'>
                                <div className='img-custom'>
                                    <img src={specialtyImg} />
                                </div>
                                <div className='img-title'><span>Cơ xương khớp</span></div>
                            </div>
                            <div className='img-customize'>
                                <div className='img-custom'>
                                    <img src={specialtyImg} />
                                </div>
                                <div className='img-title'><span>Cơ xương khớp</span></div>
                            </div>
                            <div className='img-customize'>
                                <div className='img-custom'>
                                    <img src={specialtyImg} />
                                </div>
                                <div className='img-title'><span>Cơ xương khớp</span></div>
                            </div>
                            <div className='img-customize'>
                                <div className='img-custom'>
                                    <img src={specialtyImg} />
                                </div>
                                <div className='img-title'><span>Cơ xương khớp</span></div>
                            </div>
                            <div className='img-customize'>
                                <div className='img-custom'>
                                    <img src={specialtyImg} />
                                </div>
                                <div className='img-title'><span>Cơ xương khớp</span></div>
                            </div>
                            <div className='img-customize'>
                                <div className='img-custom'>
                                    <img src={specialtyImg} />
                                </div>
                                <div className='img-title'><span>Cơ xương khớp</span></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty)