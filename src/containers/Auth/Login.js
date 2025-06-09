import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions/index";
import { userService } from '../../services';
import './Login.scss';
// import { FormattedMessage } from 'react-intl';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isShowPassword: false,
            errMessage: ''
        }
    }

    handleChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handleChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleEnter = (eventKeyDown) => {
        if (eventKeyDown.key === "Enter") {
            this.handleLogin()
        }
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await userService.handleLogin(this.state.username, this.state.password)
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    // console.log(error.response.data)
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
        }

    }

    handleShowHiddenPassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        })
    }

    render() {
        //JSX
        return (
            <>
                <div className='login-background'>
                    <div className='login-container'>
                        <div className='login-content row'>
                            <div className='col-12 text-login'>Login</div>
                            <div
                                className='col-12 form-group login-input'
                                onKeyDown={(event) => this.handleEnter(event)}
                            >
                                <label>Username:</label>
                                <input type="text"
                                    className='form-control'
                                    placeholder='Enter your username'
                                    value={this.state.username}
                                    onChange={(event) => this.handleChangeUsername(event)} />
                            </div>
                            <div className='col-12 form-group login-input'>
                                <label>Password:</label>
                                <div
                                    className='custom-input-password'
                                    onKeyDown={(event) => this.handleEnter(event)}
                                >
                                    <input
                                        type={this.state.isShowPassword ? "text" : "password"}
                                        className='form-control'
                                        placeholder='Enter your password'
                                        value={this.state.password}
                                        onChange={(event) => { this.handleChangePassword(event) }}
                                    />
                                    <span
                                        onClick={() => { this.handleShowHiddenPassword() }}
                                    >
                                        <i className={this.state.isShowPassword ? "far fa-eye" : "fas fa-eye-slash"}></i>
                                    </span>
                                </div>

                            </div>
                            <div className='col-12' style={{ color: 'red' }}>{this.state.errMessage}</div>
                            <div className='col-12'>
                                <button className='btn-login'
                                    onClick={() => { this.handleLogin() }}>Login</button>
                            </div>

                            <div className='col-12'>
                                <span className='forgot-password'>Forgot your password?</span>
                            </div>
                            <div className='col-12 text-center mt-3'>
                                <span>Or Login with:</span>
                            </div>
                            <div className='col-12 social-login'>
                                <i className="fab fa-google google"></i>
                                <i className="fab fa-facebook-f facebook"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
