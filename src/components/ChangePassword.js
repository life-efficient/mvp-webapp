import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import logo from "../images/logo.png"
import eye from "../images/see-icon.png"
import { Auth } from "aws-amplify";
import { connect } from "react-redux"
import Loading from "./Loading"


class ChangePassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
            passwordFieldType: "password",
            redirect: false,
            loading: false
        }
        console.log('user passed in as prop:', this.props)
    }

    handleChange = (event) => {
        this.setState({
        [event.target.id]: event.target.value
        },
        () => {
            console.log(this.state)
        }
        );
    }

    showPassword = () => {
        var type = this.state.passwordFieldType
        var newType = type === "password" ? "input" : "password"
        this.setState({passwordFieldType: newType})
        console.log(this.state)
    }

    renderRedirect = () => {
        if (this.state.redirect) {
        console.log('redirecting to:', this.state.redirect)
        return <Redirect to={this.state.redirect} />
        }
    }

    getError = () => {
        if ( ! (this.state.newPassword === this.state.confirmNewPassword) ) {
            return "Passwords must match"
        }
        else if (this.state.newPassword.length < 8) {
            return "Password should be longer"
        }
        else return null
    }

    handleSubmit = () => {
        console.log('user:', this.props.user)
        if (this.getError() == null) {console.log(this.props.user)
            this.setState({loading: true})
            Auth.completeNewPassword(
                this.props.user,
                this.state.newPassword
            )
            .then(
                () => {
                    this.props.dispatchLogin()
                    this.setState({redirect: this.props.from ? this.props.from : '/app/home'},
                        () => {
                            console.log('redirected')
                        }
                    )
                }
            )
        }
    }

    render() {
        return (
            <>
                {this.renderRedirect()}
                <div className="slide">
                    <div className="form-container">
                        <img src={ logo } className="main-logo" alt="" />
                        <div className="field-container long-field-title">
                            <div className="field-title ">
                                <strong>New password</strong>
                            </div>
                            <input type={ this.state.passwordFieldType } id="newPassword" className="text-response" placeholder="" onChange={ this.handleChange }/>
                        </div>
                        <div className="field-container long-field-title">
                            <div className="field-title">
                                <strong>Confirm new password</strong>
                            </div>
                            <input type={ this.state.passwordFieldType } id="confirmNewPassword" className="text-response" placeholder=""  onChange={ this.handleChange }/>
                        </div>
                        <img src={ eye } id="passwordShow" className="btn passwordShow" onClick={ this.showPassword } alt="" />
                        <div className="small form-error">
                            {this.getError()}
                        </div>
                        <button onClick={this.handleSubmit}>
                            {
                                this.state.loading ?
                                <Loading /> :
                                "Submit"
                            }
                        </button>
                    </div>
                </div>
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchLogin: () => {
            dispatch({
                type: "LOG_IN"
            })
        }
    }
}

export default ChangePassword = connect(null, mapDispatchToProps)(ChangePassword)
        {/* <div className="index-body body">
            {this.renderRedirect()}
            <div className="panel">
                <img src={ logo } className="main-logo" alt="" />
                <div className="login-field">
                    <div className="field-title small">
                        <strong>New password</strong>
                    </div>
                    <div className="login-field">
                        <input type={this.state.passwordFieldType} id="newPassword" className="text-response" placeholder="" onChange={ this.handleChange }/>
                    </div>
                </div>
                <div className="login-field">
                <div className="field-title small">
                    <strong>Confirm new password</strong>
                </div>
                <div className='password-input'>
                    <div className="login-field small">
                    <input type={ this.state.passwordFieldType } id="confirmNewPassword" className="text-response" placeholder=""  onChange={ this.handleChange }/>
                    </div>
                        <img src={ eye } id="passwordShow" className="btn passwordShow" onClick={ this.showPassword } alt="" />
                </div>
                </div>
                </div>
                <input type="submit" className="main_button btn" id="submit" onClick={ this.handleSubmit } value="Login" />
            </div>
        </div>     */}