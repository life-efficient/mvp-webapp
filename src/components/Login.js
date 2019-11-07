/** @jsx jsx */
import React, { Component } from "react";
// import "./Login.css";
import eye from "../images/see-icon.png"
import { connect } from "react-redux"
// import { Auth } from "aws-amplify"
import { Redirect } from "react-router-dom"
import ChangePassword from "./ChangePassword"
import Loading from "./Loading"
import queryString from "query-string"
import styled from "@emotion/styled"
import { jsx, css } from "@emotion/core"
import { Form } from "../styles/forms"
import { panel, button } from "../styles/theme"
import { Auth } from "aws-amplify"


const passwordShow = css`
    --dim: 40px;
    width: var(--dim);
    height: var(--dim);
    min-height:var(--dim);
    min-width: var(--dim);
    margin: auto;
    background-color: transparent;
    display: inline-block;
    vertical-align: center;
    padding: 0;
    cursor: pointer;
`
const mainLogo = css`
    --logo-dim: 40px;
    height: var(--logo-dim);
    width: var(--logo-dim);
    max-height: 300px;
    margin: 20px auto;
`

const password_field = css`
  display: flex;
  img {
    margin-bottom: 10px !important;
    margin-left: 10px !important;
  }
`

class Login extends Component {
  constructor(props) {
    super(props);
    var params = queryString.parse(window.location.search)
    // console.log('params:', params)
    this.state = {
      username: params.u ? params.u : "",
      password: params.p ? params.p : "",
      passwordFieldType: "password",
      redirect: null,
      panel: "login",
      user: null,
      loading: false,
      error: null,
      email: '',
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    };
  }

//   componentDidMount = () => {
//       window.analytics.page('login')
//   }

  validateForm = () => {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    if (event.target.id !== 'password') {event.target.value = event.target.value.toLowerCase()}
    this.setState({
      [event.target.id]: event.target.value
    },
      () => {
          console.log(this.state)
      }
    );
  }

  handleSubmit = async event => {
    this.setState({loading: true})
    console.log('submitting')
    event.preventDefault();
    switch(this.state.panel) {
      case 'login': 
        try {
          var user = await Auth.signIn(
            this.state.username,
            this.state.password
          )
          if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
              this.setState({panel: "set-password"})
          }
          else {
            this.props.dispatchLogin()
            console.log(this.props.logged_in)
            Auth.currentSession()
            .then(
              data => {
                // console.log('session data:', user)
              }
            )
            this.setState({redirect: this.props.location.state ? this.props.location.state.from : '/app'},
              () => {
                  console.log('redirected')
              }
            )
          }
        } 
        catch (err) {
        //   if (err.code === 'UserNotConfirmedException') {
        //     // The error happens if the user didn't finish the confirmation step when signing up
        //     // In this case you need to resend the code and confirm the user
        //     // About how to resend the code and confirm the user, please check the signUp part
        // } else if (err.code === 'PasswordResetRequiredException') {
        //     // The error happens when the password is reset in the Cognito console
        //     // In this case you need to call forgotPassword to reset the password
        //     // Please check the Forgot Password part.
        // } else if (err.code === 'NotAuthorizedException') {
        //     // The error happens when the incorrect password is provided
        // } else if (err.code === 'UserNotFoundException') {
        //     // The error happens when the supplied username/email does not exist in the Cognito user pool
        // } else {
            this.setState({error: 'Incorrect username or password'})
            console.log(err);
        // }
        }
        this.setState({loading: false})
        return
      case 'get-details':
        console.log('submitting email')
        return
      case 'set-password':
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
        return
    }
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

  getPanel = () => {
    // console.log(this.state)
    console.log('login props:', this.props)

    switch (this.state.panel) {
      case "login":
        return (
          <>
          {this.renderRedirect()}
              <div css={Form} >
                <div className="field-container long-field-title">
                    <div className="field-title ">
                        <strong>Username</strong>
                    </div>
                    <br/>
                    <input type="text" id="username" value={this.state.username} className="text-response" placeholder="" onChange={ this.handleChange }/>
                </div>
                <div className="field-container ">
                  <div className="field-title">
                    <strong>Password</strong>
                  </div>
                  <br/>
                  <div css={password_field}>
                    <input type={ this.state.passwordFieldType } id="password" value={this.state.password} className="text-response" placeholder=""  onChange={ this.handleChange }/>
                    <img src={ eye } css={passwordShow} onClick={ this.showPassword } alt="" />
                  </div>
                </div>
                <div className="form-error">{this.state.error}</div>
                <div css={{cursor: 'pointer', textDecoration: 'underline', padding: '0 0 10px 0', fontSize: '12px'}} onClick={() => {this.setState({panel: 'get-details'})}}>
                    Don't know your details?
                </div>
                <button css={button} style={{backgroundColor: 'var(--color1)', color: 'var(--color2)'}} type="submit" onClick={this.handleSubmit}>
                    {
                      this.state.loading ?
                      <Loading /> :
                      "Submit"
                    }
                </button>
              </div>
          </>
        )
      case "set-password":
        if (!this.state.user) {
            var user = Auth.signIn(this.state.username, this.state.password)
            .then(
              (user) => {
                this.setState({user: user})
              }
            )
        }
        return (
          <>
            {this.renderRedirect()}
              <div css={Form} className="form-container">
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
                      <div css={password_field}>
                        <input type={ this.state.passwordFieldType } id="confirmNewPassword" className="text-response" placeholder=""  onChange={ this.handleChange }/>
                        <img src={ eye } id="passwordShow" css={passwordShow} onClick={ this.showPassword } alt="" />
                      </div>
                  </div>
                  <div className='error'>
                      {this.getError()}
                  </div>
                  <button css={button} style={{backgroundColor: 'var(--color1)', color: 'var(--color2)'}} type='submit' onClick={this.handleSubmit}>
                    {
                      this.state.loading ?
                      <Loading /> :
                      "Submit"
                    }
                  </button>
              </div>
          </>
        )
      case "get-details":
        return (
          <>
          {this.renderRedirect()}
            <div css={panel}>
              <div css={Form} className="form-container">
                {/* <img src={ logo } css={mainLogo} alt="" /> */}
                <div className="field-container long-field-title">
                    <div className="field-title ">
                        <strong>Email</strong>
                    </div>
                    <input type="text" id="email" value={this.state.email} className="text-response" placeholder="" onChange={ this.handleChange }/>
                </div>
                <button css={button} style={{backgroundColor: 'var(--color1)', color: 'var(--color2)'}} type="submit" onClick={this.handleSubmit}>
                    {
                      this.state.loading ?
                      <Loading /> :
                      "Send verification email"
                    }
                </button>
              </div>
            </div>
          </>
        )
      default:
        return null
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

  render() {
    return (
      <>
      {/* <Navbar /> */}
          <div css={panel} >
            <img src={this.props.logo} style={{height: '200px', margin: '40px'}} alt=""/>
          {/* // style={{backgroundColor: 'var(--green)', width: '400px', margin: 'auto', padding: '20px'}}> */}
            {this.getPanel()}
          </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // logged_in: state.user.logged_in,
    logo: state.app.logo
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

export default Login = connect(mapStateToProps, mapDispatchToProps)(Login)