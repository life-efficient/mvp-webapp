/** @jsx jsx */
import React, { Component } from "react";
// import "./Login.css";
// import logo from "../images/logo.png"
import eye from "../images/see-icon.png"
// import { connect } from "react-redux"
// import { Auth } from "aws-amplify"
import { Redirect } from "react-router-dom"
import ChangePassword from "./ChangePassword"
import Loading from "./Loading"
import queryString from "query-string"
import styled from "@emotion/styled"
import { jsx, css } from "@emotion/core"
import { Form } from "../styles/forms"

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
`
const mainLogo = css`
    --logo-dim: 40px;
    height: var(--logo-dim);
    width: var(--logo-dim);
    max-height: 300px;
    margin: 20px auto;
`

// .password-input {
//   display: flex;
// }

// .form-error {
//     box-shadow: none;
//     color: red;
// }

// .get-details {
//     box-shadow: none;
//     font-size: 10px;
//     text-decoration: underline;
//     cursor: pointer;
//     margin-bottom: 10px;
// }

export default class Login extends Component {
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
      error: null
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
    try {
      var user = await Auth.signIn(
        this.state.username,
        this.state.password
      )
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          this.setState({panel: "changePassword"})
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
    } catch (err) {
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
            <div className="slide">
              <div css={Form} className="form-container">
                {/* <img src={ logo } css={mainLogo} alt="" /> */}
                <div className="field-container long-field-title">
                    <div className="field-title ">
                        <strong>Username</strong>
                    </div>
                    <input type="text" id="username" value={this.state.username} className="text-response" placeholder="" onChange={ this.handleChange }/>
                </div>
                <div className="field-container ">
                  <div className="field-title">
                    <strong>Password</strong>
                  </div>
                  <br/>
                  <div className="password-field">
                    <input type={ this.state.passwordFieldType } id="password" value={this.state.password} className="text-response" placeholder=""  onChange={ this.handleChange }/>
                    {/* <img src={ eye } css={passwordShow} onClick={ this.showPassword } alt="" /> */}
                  </div>
                </div>
                <div className="form-error">{this.state.error}</div>
                <div className="small get-details" onClick={() => {this.setState({panel: 'get-details'})}}>
                    Don't know your details?
                </div>
                <button className="submit-form" type="submit" onClick={this.handleSubmit}>
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
      case "changePassword":
        if (!this.state.user) {
            var user = Auth.signIn(this.state.username, this.state.password)
            .then(
              (user) => {
                this.setState({user: user})
              }
            )
        }
        console.log('user:', this.state.user)
        return this.state.user ? <ChangePassword user={this.state.user} from={this.props.location.state ? this.props.location.state.from : null}/> : null
      case "get-details":
        return (
          <>

          {this.renderRedirect()}
          <div className="slide">
          <div className="form-container">
              {/* <img src={ logo } css={mainLogo} alt="" /> */}
              <div className="field-container long-field-title">
                  <div className="field-title ">
                      <strong>Enter your contact email</strong>
                  </div>
                  <input className="text-response" prompt="email" value={this.state.username} /> 
              </div>
                <button className="submit-form" onClick={this.handleSubmit}>
                    {
                      this.state.loading ?
                      <Loading /> :
                      "Send verification code"
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

  render() {
    return (
      <>
      {/* <Navbar /> */}
          <div className="panel" >
          {/* // style={{backgroundColor: 'var(--green)', width: '400px', margin: 'auto', padding: '20px'}}> */}
            {this.getPanel()}
          </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    logged_in: state.user.logged_in
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

// export default Login = connect(mapStateToProps, mapDispatchToProps)(Login)