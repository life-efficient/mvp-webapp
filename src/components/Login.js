/** @jsx jsx */
import React, { Component } from "react";
// import "./Login.css";
import eye from "../images/see-icon.png"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import Loading from "./Loading"
import queryString from "query-string"
import styled from "@emotion/styled"
import { jsx, css, keyframes } from "@emotion/core"
import { Form as FormStyle } from "../styles/forms"
import { panel } from "../styles/theme"
import { expand_in } from "../styles/animations"
import { Auth } from "aws-amplify"
import { makeid } from "../utils"
import Form from "./Form"

const style = css`
  animation-name: ${expand_in};
  animation-duration: 1s;
  // animation-direction: normal;
  ${panel};
`

// VERSION OF COMPONENT THAT USES PASSWORDS
class Login extends Component {
  constructor(props) {
    super(props);
    var params = queryString.parse(window.location.search)
    // console.log('params:', params)
    this.state = {
      username: params.u ? params.u : "",
      password: params.p ? params.p : "",
      passwordFieldType: "password",
      redirect: props.redirect,
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

  // validateFormStyle = () => {
  //   return this.state.username.length > 0 && this.state.password.length > 0;
  // }

  // handleChange = event => {
  //   if (event.target.id !== 'password') {event.target.value = event.target.value.toLowerCase()}
  //   this.setState({
  //     [event.target.id]: event.target.value
  //   },
  //     () => {
  //         console.log(this.state)
  //     }
  //   );
  // }

  handleSubmit = async event => {
    this.setState({loading: true})
    // console.log('handling submit on panel:', this.state.panel)
    console.log(event)
    switch(this.state.panel) {
      case 'login': 
        try {
          var user = await Auth.signIn(
            event.email,
            event.password
          )
          console.log('user:', user)
          if (user.challengeName) {
            if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                this.setState({
                  user,
                  panel: "set-password"
                })
            }
          }
        } 
        catch (err) {
          console.error('error:', err)
          if (err.name === "UserNotConfirmedException") {// if they haven't confirmed yet, 
            Auth.resendSignUp(event.email)    // send them an email
            this.props.openModal(     // prompt them to enter code
              <Form
                slides={[
                  {
                    title: 'Confirm email',
                    onSubmit: async (e) => {
                      await Auth.confirmSignUp(event.email, e.code)     // confirm the code
                      // console.log('confirmed')
                      this.props.closeModal()   // close the modal
                      // await Auth.signIn(event.email, event.password)
                    },
                    questions: [{title: 'code', type: 'text', id: 'code'}]
                  }
                ]}
              />
            )
          }
          //   if (err.code === 'UserNotConfirmedException') {
          if (err.code === 'UserNotFoundException') {
              throw err
          //     // The error happens if the user didn't finish the confirmation step when signing up
          //     // In this case you need to resend the code and confirm the user
          //     // About how to resend the code and confirm the user, please check the signUp part
          } 
          else if (err.code === 'PasswordResetRequiredException') {
            alert('pw reset not handled')
          //     // The error happens when the password is reset in the Cognito console
          //     // In this case you need to call forgotPassword to reset the password
          //     // Please check the Forgot Password part.
          } 
          else if (err.code === 'NotAuthorizedException') {
            throw err
          //     // The error happens when the incorrect password is provided
          } 
          else {
              console.error(err);
              alert('error not handled')
          }
        }
        this.setState({loading: false})
        return
      case 'get-details':
        alert('get-details should be handled in the form as a prop')
        return
      case 'set-password':
        this.setState({loading: true})
        // var user = await Auth.currentUserPoolUser() # TODO make work
        Auth.completeNewPassword(
            this.state.user,
            event.password
        )
        .then(
            () => {
                this.setState({redirect: this.props.from ? this.props.from : this.props.redirect ? this.props.redirect : '/'},
                    () => {
                        console.log('redirected')
                    }
                )
            }
        )
    }
  }

  getPanel = () => {
    // console.log(this.state)
    console.log('login props:', this.props)
    console.log('case:', this.state.panel)
    switch (this.state.panel) {
      case "login":
        return (
          <>
          <Form
            redirect={this.state.redirect}
            slides={[
              {
                title: 'Log in',
                onSubmit: this.handleSubmit,
                questions:[
                  {
                    title: 'Email',
                    type: 'text',
                    id: 'email',
                  },
                  {
                    title: 'Password',
                    type: 'password',
                    id: 'password',
                  }
                ],
                detail: <div style={{textDecoration: 'underline', cursor: 'pointer', display: 'flex', justifyContent: 'space-between'}}>
                  <div onClick={()=>{this.setState({panel:'get-details'})}}>
                    Forgot your details?
                  </div>
                  {
                    this.props.can_sign_up === false
                    ?
                    null
                    :
                    <div onClick={()=>{this.setState({panel:'redirect'})}}>
                      Sign up
                    </div>   
                  }
                </div>
              }
            ]}
            />
          </>
        )
      case "set-password":
        return <Form slides={[
          {
            title: 'Set password',
            questions: [
              {
                id: 'password',
                type: 'confirm-password',
              }
            ],
            onSubmit: this.handleSubmit
          }
        ]}/>
      case "get-details":
        return (
          <Form             
            slides={[
              {
                title: 'Forgot your password?',
                subtitle: 'Enter your email to get a confirmation code',
                redirect: '/',
                questions: [
                  {
                    title: 'Email',
                    type: 'text',
                    id: 'email'
                  },
                ],
                onSubmit: (e)=>{
                  console.log(e.email)
                  Auth.forgotPassword(e.email)
                }
              },
              {
                title: 'Enter code',
                subtitle: 'Check the email you signed up with for the code',
                questions: [
                  {title:'Code', type: 'text', id: 'code'},
                  {title: 'New password', type:'password', id:'new_password'},
                ],
                onSubmit: (e) => {
                  console.log('event:', e)
                  console.log('submitting:', e.email, e.code, e.new_password)
                  Auth.forgotPasswordSubmit(e.email, e.code, e.new_password)}
              }
            ]}
          />
        )
      case 'redirect':
        return <Redirect to="/signup" />
      default:
        return null
    }
  }

  render() {
    return (
      <>
          <div css={style} >
            <img src={this.props.logo} style={{height: '200px', margin: '40px'}} alt=""/>
            {this.getPanel()}
          </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log('state:', state)
  return {
    logo: state.app.logo
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => {
            dispatch({
                type: "CLOSE_MODAL",
            })
        },
        openModal: (content) => {
            dispatch({
                type: "OPEN_MODAL",
                content
            })
        }
    }
}

export default Login = connect(mapStateToProps, mapDispatchToProps)(Login)