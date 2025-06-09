import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES, USER_ROLES } from '../../utils';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';

class Header extends Component {

    constructor(props) {
        super(props)
        this.state = {
            menuApp: []
        }
    }

    componentDidMount = () => {
        let { userInfo } = this.props
        let currentMenu = []
        if (userInfo && !_.isEmpty(userInfo)) {
            let userRole = userInfo.roleId
            if (userRole === USER_ROLES.ADMIN) {
                currentMenu = adminMenu
            }
            if (userRole === USER_ROLES.DOCTOR) {
                currentMenu = doctorMenu
            }
        }
        this.setState({
            menuApp: currentMenu
        })
    }

    handleChangeLanguage = (language) => {
        this.props.changLanguage(language)
    }

    render() {

        const { processLogout, language, userInfo } = this.props;
        const { menuApp } = this.state

        return (
            <div className="header-container">
                <div className="header-tabs-container">
                    <Navigator menus={menuApp} />
                </div>
                <div className='languages'>
                    <span
                        className='welcome'
                    >
                        <FormattedMessage id={"homeHeader.welcome"} />
                        {userInfo && userInfo.firstName ? userInfo.firstName : ""}
                    </span>
                    <span
                        className={language === LANGUAGES.VI ? 'language-vi lang-active' : "language-vi"}
                        onClick={() => { this.handleChangeLanguage(LANGUAGES.VI) }}
                    >
                        VN
                    </span>
                    <span
                        className={language === LANGUAGES.EN ? 'language-en lang-active' : "language-en"}
                        onClick={() => { this.handleChangeLanguage(LANGUAGES.EN) }}
                    >
                        EN
                    </span>
                    <div className="btn btn-logout" onClick={processLogout} title='Log out'>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changLanguage: (languageInput) => dispatch(actions.changeAppLanguage(languageInput))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
