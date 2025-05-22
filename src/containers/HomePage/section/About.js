import React, { Component } from 'react'
import { connect } from 'react-redux'

import SocialImg1 from '../../../assets/images/social_icon/vnexpress.png'
import SocialImg2 from '../../../assets/images/social_icon/142415-logo-vnnet.png'
import SocialImg3 from '../../../assets/images/social_icon/dantrilogo.png'
import SocialImg4 from '../../../assets/images/social_icon/suckhoedoisong.png'
import SocialImg5 from '../../../assets/images/social_icon/vnexpress.png'
import SocialImg6 from '../../../assets/images/social_icon/vtcnewslogosvg.png'
import SocialImg7 from '../../../assets/images/social_icon/vtv1.png'
import SocialImg8 from '../../../assets/images/social_icon/dantrilogo.png'

export class About extends Component {
    render() {
        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Truyền thông nói về BookingCare
                </div>
                <div className='section-about-content'>
                    <div className='left-content'>
                        <iframe
                            width="100%"
                            height="400px"
                            src="https://www.youtube.com/embed/FyDQljKtWnI"
                            title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className='right-content'>
                        <div className='right-child'>
                            <div className='child'>
                                <a href='#'>
                                    <img src={SocialImg1} />
                                </a>
                            </div>
                            <div className='child'>
                                <a href='#'>
                                    <img src={SocialImg2} />
                                </a>
                            </div>
                            <div className='child'>
                                <a href='#'>
                                    <img src={SocialImg3} />
                                </a>
                            </div>
                            <div className='child'>
                                <a href='#'>
                                    <img src={SocialImg4} />
                                </a>
                            </div>
                            <div className='child'>
                                <a href='#'>
                                    <img src={SocialImg5} />
                                </a>
                            </div>
                            <div className='child'>
                                <a href='#'>
                                    <img src={SocialImg6} />
                                </a>
                            </div>
                            <div className='child'>
                                <a href='#'>
                                    <img src={SocialImg7} />
                                </a>
                            </div>
                            <div className='child'>
                                <a href='#'>
                                    <img src={SocialImg8} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(About)