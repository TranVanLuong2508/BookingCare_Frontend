import React, { Component } from 'react'
import { connect } from 'react-redux'
import './HomeHeader.scss'
import logo from '../../assets/logo.png'

export class HomeHeader extends Component {
    render() {
        return (
            <>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <div className='bar-icon'><i className='fas fa-bars'></i></div>
                            <div className='header-logo'>
                                <a href='https://www.facebook.com/'>
                                    <img src={logo} />
                                </a>
                            </div>
                        </div>
                        <div className='center-content'>
                            <div className='center-child'>
                                <div ><b>Chuyên khoa</b></div>
                                <div className='sub-title-content'>Tìm bác sĩ theo chuyên khoa</div>
                            </div>
                            <div className='center-child'>
                                <div><b>Cơ sở y tế</b></div>
                                <div className='sub-title-content'>Chọn bệnh viện phòng khám</div>
                            </div>
                            <div className='center-child'>
                                <div><b>Bác sĩ</b></div>
                                <div className='sub-title-content'>Chọn bác sĩ phù hợp</div>
                            </div>
                            <div className='center-child'>
                                <div><b>Gói khám</b></div>
                                <div className='sub-title-content'>Khám sức khỏe tổng quát</div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'><i class="far fa-question-circle"></i>Hỗ trợ</div>
                            <div className='language'>VN</div>
                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='title-banner-1'>nền tảng y tế</div>
                    <div className='title-banner-2'>chăm sóc sức khỏe toàn diến</div>
                    <div className='search'>
                        <div className='search-icon'><i class="fas fa-search"></i></div>
                        <div className='input-search'>
                            <input type='text' placeholder='Tìm kiếm' />
                        </div>
                    </div>
                    <div className='options'></div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader)