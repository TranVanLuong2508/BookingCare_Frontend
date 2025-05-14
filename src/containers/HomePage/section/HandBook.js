import React, { Component } from 'react'
import { connect } from 'react-redux'
import Slider from "react-slick";

import HandBookImg from '../../../assets/images/handbook/handbook_1png.png'

export class HandBook extends Component {
    render() {
        return (
            <div className='section-share section-handbook '>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cẩm nang</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='img-customize'>
                                <div className='img-custom img-handbook'>
                                    <img src={HandBookImg} />
                                </div>
                                <div className='img-title'><span>Review Bệnh viện An Việt</span></div>
                            </div>
                            <div className='img-customize'>
                                <div className='img-custom img-handbook'>
                                    <img src={HandBookImg} />
                                </div>
                                <div className='img-title'><span>Review Bệnh viện An Việt</span></div>
                            </div>
                            <div className='img-customize'>
                                <div className='img-custom img-handbook'>
                                    <img src={HandBookImg} />
                                </div>
                                <div className='img-title'><span>Review Bệnh viện An Việt</span></div>
                            </div>
                            <div className='img-customize'>
                                <div className='img-custom img-handbook'>
                                    <img src={HandBookImg} />
                                </div>
                                <div className='img-title'><span>Review Bệnh viện An Việt</span></div>
                            </div>
                            <div className='img-customize'>
                                <div className='img-custom img-handbook'>
                                    <img src={HandBookImg} />
                                </div>
                                <div className='img-title'><span>Review Bệnh viện An Việt</span></div>
                            </div>
                            <div className='img-customize'>
                                <div className='img-custom img-handbook'>
                                    <img src={HandBookImg} />
                                </div>
                                <div className='img-title'><span>Review Bệnh viện An Việt</span></div>
                            </div>
                            <div className='img-customize'>
                                <div className='img-custom img-handbook'>
                                    <img src={HandBookImg} />
                                </div>
                                <div className='img-title'><span>Review Bệnh viện An Việt</span></div>
                            </div>
                            <div className='img-customize'>
                                <div className='img-custom img-handbook'>
                                    <img src={HandBookImg} />
                                </div>
                                <div className='img-title'><span>Review Bệnh viện An Việt</span></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook)