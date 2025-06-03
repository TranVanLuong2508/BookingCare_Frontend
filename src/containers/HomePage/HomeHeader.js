import React, { Component } from 'react'
import { connect } from 'react-redux'
import './HomeHeader.scss'
import logo from '../../assets/logo.png'
import { FormattedMessage } from 'react-intl'
import { LANGUAGES } from '../../utils/constant'
import { changeAppLanguage } from '../../store/actions/appActions'

export class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changLanguage(language)
    }

    render() {
        let { isShowBanner, language } = this.props
        return (
            <>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <div className='bar-icon'><i className='fas fa-bars'></i></div>
                            <div className='header-logo'>
                                <a href='/home'>
                                    <img src={logo} />
                                </a>
                            </div>
                        </div>
                        <div className='center-content'>
                            <div className='center-child'>
                                <div ><b><FormattedMessage id={"homeHeader.speciality"} /></b></div>
                                <div className='sub-title-content'><FormattedMessage id={"homeHeader.searchDoctor"} /></div>
                            </div>
                            <div className='center-child'>
                                <div><b><FormattedMessage id={"homeHeader.medicalFacility"} /></b></div>
                                <div className='sub-title-content'><FormattedMessage id={"homeHeader.chooseClinic"} /></div>
                            </div>
                            <div className='center-child'>
                                <div><b><FormattedMessage id={"homeHeader.doctor"} /></b></div>
                                <div className='sub-title-content'><FormattedMessage id={"homeHeader.chooseSuitableDoctor"} /></div>
                            </div>
                            <div className='center-child'>
                                <div><b><FormattedMessage id={"homeHeader.checkupPackage"} /></b></div>
                                <div className='sub-title-content'><FormattedMessage id={"homeHeader.generalCheckup"} /></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'><i className="far fa-question-circle"></i>
                                <FormattedMessage id={"homeHeader.support"} />
                            </div>
                            <div className='language'>
                                <div
                                    className={language === LANGUAGES.VI ? 'language-vi lang-active' : "language-vi"}>
                                    <span
                                        onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                                        VN
                                    </span>
                                </div>
                                <div
                                    className={language === LANGUAGES.EN ? 'language-en lang-active' : "language-en"}>
                                    <span
                                        onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                                        EN
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {isShowBanner === true && (
                    <div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='title-banner-1'>nền tảng y tế</div>
                            <div className='title-banner-2'>chăm sóc sức khỏe toàn diến</div>
                            <div className='search'>
                                <div className='search-icon'><i className="fas fa-search"></i></div>
                                <div className='input-search'>
                                    <input type='text' placeholder="Tìm kiếm" />
                                </div>
                            </div>
                        </div>

                        <div className='content-down'>
                            <div className='options'>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-hospital-alt"></i></div>
                                    <div className='text-child'><FormattedMessage id={"banner.specialtyCheckup"} /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-mobile-alt"></i></div>
                                    <div className='text-child'><FormattedMessage id={"banner.remoteConsultation"} /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-procedures"></i></div>
                                    <div className='text-child'><FormattedMessage id={"banner.generalCheckup"} /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-flask"></i></div>
                                    <div className='text-child'><FormattedMessage id={"banner.medicalTesting"} /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-user-md"></i></div>
                                    <div className='text-child'><FormattedMessage id={"banner.mentalHealth"} /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-briefcase-medical"></i></div>
                                    <div className='text-child'><FormattedMessage id={"banner.dentalCheckup"} /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language
})

const mapDispatchToProps = (dispatch) => {
    return {
        changLanguage: (languageInput) => dispatch(changeAppLanguage(languageInput))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader)