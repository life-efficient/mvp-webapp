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
    console.log('handling submit on panel:', this.state.panel)
    console.log(event)
    switch(this.state.panel) {
      case 'login': 
        try {
          var user = await Auth.signIn(
            event.email,
            event.password
          )
        }
        catch (err) {
          console.error(err)
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
              this.setState({error: 'Account not found, try signing up first'})
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
            alert('not authorized not handled')
          //     // The error happens when the incorrect password is provided
          } 
          else if (err.code === 'UserNotFoundException') {
            alert('user not found not handled')
              // The error happens when the supplied username/email does not exist in the Cognito user pool
          } 
          else {
              alert('error not handled')
              this.setState({error: 'Incorrect username or password'})
              console.log(err);
          }
        }
        
        if (user.challengeName) {
          if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
              this.setState({panel: "set-password"})
          }

        }
        this.setState({loading: false})
        return
      case 'get-details':
        alert('get-details should be handled in the form as a prop')
        return
      // case 'set-password':
      //   console.log('user:', this.props.user)
      //   if (this.getError() == null) {console.log(this.props.user)
      //       this.setState({loading: true})
      //       Auth.completeNewPassword(
      //           this.props.user,
      //           this.state.newPassword
      //       )
      //       .then(
      //           () => {
      //               this.props.dispatchLogin()
      //               this.setState({redirect: this.props.from ? this.props.from : '/app/home'},
      //                   () => {
      //                       console.log('redirected')
      //                   }
      //               )
      //           }
      //       )
      //   }
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
                // async (event) => {
                //   // console.log('logging in')
                //   alert('yo')
                //   try {
                //     var r = await Auth.signIn(event.email, event.password);   // try to sign in
                //     console.log('successfully signed in')
                //     console.log(r)
                //     return      // successful sign in
                //   }
                //   catch (err) {
                //     console.log('Failed to sign in:', err)
                //   }
                //   throw 'Error'
                //   console.log('response:', r)
                // },
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
        alert('setting password')
        if (!this.state.user) {
            var user = Auth.signIn(this.state.username, this.state.password)
            .then(
              (user) => {
                this.setState({user: user})
              }
            )
        }
        return <Form slides={[
          {
            title: 'Set password',
            questions: [
              {
                type: 'confirm-password',
              }
            ],
            onSubmit: this.handleSubmit
          }
        ]}/>
        //   <>
        //     <div css={Form} className="form-container">
        //         <div className="field-container long-field-title">
        //           <div className="field-title ">
        //               <strong>New password</strong>
        //           </div>
        //           <input type={ this.state.passwordFieldType } id="newPassword" className="text-response" placeholder="" onChange={ this.handleChange }/>
        //         </div>
        //         <div className="field-container long-field-title">
        //           <div className="field-title">
        //               <strong>Confirm new password</strong>
        //           </div>
        //             <div css={password_field}>
        //               <input type={ this.state.passwordFieldType } id="confirmNewPassword" className="text-response" placeholder=""  onChange={ this.handleChange }/>
        //               <img src={ eye } id="passwordShow" css={passwordShow} onClick={ this.showPassword } alt="" />
        //             </div>
        //         </div>
        //         <div className='error'>
        //             {this.getError()}
        //         </div>
        //         <button css={button} style={{backgroundColor: 'var(--color1)', color: 'var(--color2)'}} type='submit' onClick={this.handleSubmit}>
        //           {
        //             this.state.loading ?
        //             <Loading /> :
        //             "Submit"
        //           }
        //         </button>
        //     </div>
        //   </>
        // )
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

  // getError = () => {
  //   if ( ! (this.state.newPassword === this.state.confirmNewPassword) ) {
  //       return "Passwords must match"
  //   }
  //   else if (this.state.newPassword.length < 8) {
  //       return "Password should be longer"
  //   }
  //   else return null
  // }

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
  console.log('state:', state)
  console.log('APP:', state.app)
  return {
    // logged_in: state.user.logged_in,
    logo: state.app.logo
  }
}

const mapDispatchToProps = (dispatch) => {
  // alert('yoo')
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
// class Login extends Component {
//   constructor(props) {
//     super(props);
//     var params = queryString.parse(window.location.search)
//     // console.log('params:', params)
//     this.state = {
//       username: params.u ? params.u : "",
//       password: params.p ? params.p : "",
//       passwordFieldType: "password",
//       redirect: null,
//       panel: "login",
//       user: null,
//       loading: false,
//       error: null,
//       email: '',
//       oldPassword: '',
//       newPassword: '',
//       confirmNewPassword: '',
//     };
//   }

// //   componentDidMount = () => {
// //       window.analytics.page('login')
// //   }

//   validateForm = () => {
//     return this.state.username.length > 0 && this.state.password.length > 0;
//   }

//   handleChange = event => {
//     if (event.target.id !== 'password') {event.target.value = event.target.value.toLowerCase()}
//     this.setState({
//       [event.target.id]: event.target.value
//     },
//       () => {
//           console.log(this.state)
//       }
//     );
//   }

//   sendCode = async event => {
//     try {
//       await Auth.forgotPassword(this.state.username)
//       this.setState({panel: 'login-code'})
//     }
//     catch (err) {
//       console.log('ERROR:', err)
//       console.log(err.code)
//       if (err.code === 'UserNotFoundException')
//         this.setState({error: 'Account not found, try signing up first'})
//     }
//   }

//   login = async event => {
//     var p = makeid()
//     await Auth.forgotPasswordSubmit(this.state.username, p, p)
//     try {
//       await Auth.signIn(this.state.username, p)
//     }
//     catch (err) {
//       console.log(err)
//     }
//   }

//   handleSubmit = async event => {
//     this.setState({loading: true})
//     console.log('submitting')
//     event.preventDefault();
//     switch(this.state.panel) {
//       case 'login': 
//         try {
//           var user = await Auth.signIn(
//             this.state.username,
//             this.state.password
//           )
//           if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
//               this.setState({panel: "set-password"})
//           }
//           else {
//             this.props.dispatchLogin()
//             console.log(this.props.logged_in)
//             Auth.currentSession()
//             .then(
//               data => {
//                 // console.log('session data:', user)
//               }
//             )
//             this.setState({redirect: this.props.location.state ? this.props.location.state.from : '/app'},
//               () => {
//                   console.log('redirected')
//               }
//             )
//           }
//         } 
//         catch (err) {
//         //   if (err.code === 'UserNotConfirmedException') {
//         if (err.code === 'UserNotFoundException') {
//             this.setState({error: 'Account not found, try signing up first'})
//         //     // The error happens if the user didn't finish the confirmation step when signing up
//         //     // In this case you need to resend the code and confirm the user
//         //     // About how to resend the code and confirm the user, please check the signUp part
//         // } else if (err.code === 'PasswordResetRequiredException') {
//         //     // The error happens when the password is reset in the Cognito console
//         //     // In this case you need to call forgotPassword to reset the password
//         //     // Please check the Forgot Password part.
//         // } else if (err.code === 'NotAuthorizedException') {
//         //     // The error happens when the incorrect password is provided
//         // } else if (err.code === 'UserNotFoundException') {
//             // The error happens when the supplied username/email does not exist in the Cognito user pool
//         } else {
//             this.setState({error: 'Incorrect username or password'})
//             console.log(err);
//         }
//         }
//         this.setState({loading: false})
//         return
//     }
//   }

//   showPassword = () => {
//     var type = this.state.passwordFieldType
//     var newType = type === "password" ? "input" : "password"
//     this.setState({passwordFieldType: newType})
//     console.log(this.state)
//   }

//   renderRedirect = () => {
//     if (this.state.redirect) {
//       console.log('redirecting to:', this.state.redirect)
//       return <Redirect to={this.state.redirect} />
//     }
//   }

//   getPanel = () => {
//     // console.log(this.state)
//     console.log('login props:', this.props)

//     switch (this.state.panel) {
//       case "login":
//         return (
//           <>
//           {this.renderRedirect()}
//               <div css={Form} >
//                 <div style={{fontWeight: 1000, fontSize: '35px', marginBottom: '20px'}} >Log in</div>
//                 <div className="field-container long-field-title">
//                     <div className="field-title ">
//                         <strong>Email</strong>
//                     </div>
//                     <br/>
//                     <input type="text" id="username" value={this.state.username} className="text-response" placeholder="" onChange={ this.handleChange }/>
//                 </div>
//                 {/* <div className="field-container ">
//                   <div className="field-title">
//                     <strong>Password</strong>
//                   </div>
//                   <br/>
//                   <div css={password_field}>
//                     <input type={ this.state.passwordFieldType } id="password" value={this.state.password} className="text-response" placeholder=""  onChange={ this.handleChange }/>
//                     <img src={ eye } css={passwordShow} onClick={ this.showPassword } alt="" />
//                   </div>
//                 </div> */}
//                 <div className="form-error">{this.state.error}</div>
//                 <div css={{cursor: 'pointer', textDecoration: 'underline', padding: '0 0 10px 0', fontSize: '12px', display: 'flex', justifyContent: 'space-between'}}>
//                   {/* <div onClick={() => {this.setState({panel: 'get-details'})}}>
//                     Don't know your details?
//                   </div> */}
//                   <div onClick={() => {this.setState({panel: 'redirect-to-signup'})}}>
//                     Don't have an account? Sign up
//                   </div>
//                 </div>
//                 <button css={button} style={{backgroundColor: 'var(--color1)', color: 'var(--color2)'}} type="submit" onClick={this.sendCode}>
//                     {
//                       this.state.loading ?
//                       <Loading /> :
//                       "Get login code"
//                     }
//                 </button>
//               </div>
//           </>
//         )
//       case 'login-code':
//         return (
//           <div css={Form} >
//             <div style={{fontWeight: 1000, fontSize: '35px', marginBottom: '20px'}} >Log in</div>
//             <div className="field-container long-field-title">
//                 <div className="field-title ">
//                     <strong>Enter the code we emailed you</strong>
//                 </div>
//                 <br/>
//                 <input type="text" id="login-code" value={this.state.username} className="text-response" placeholder="" onChange={ this.handleChange }/>
//             </div>
//             <button css={button} style={{backgroundColor: 'var(--color1)', color: 'var(--color2)'}} type="submit" onClick={this.login}>
//                 {
//                   this.state.loading ?
//                   <Loading /> :
//                   "Get login code"
//                 }
//             </button>
//           </div>
//         )
//       case 'redirect-to-signup':
//         return <Redirect to="/signup" />
//       default:
//         return null
//     }
//   }

//   getError = () => {
//     if ( ! (this.state.newPassword === this.state.confirmNewPassword) ) {
//         return "Passwords must match"
//     }
//     else if (this.state.newPassword.length < 8) {
//         return "Password should be longer"
//     }
//     else return null
//   }

//   render() {
//     return (
//       <>
//       {/* <Navbar /> */}
//           <div css={panel} >
//             <img src={this.props.logo} style={{height: '200px', margin: '40px'}} alt=""/>
//           {/* // style={{backgroundColor: 'var(--green)', width: '400px', margin: 'auto', padding: '20px'}}> */}
//             {this.getPanel()}
//           </div>
//       </>
//     )
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     // logged_in: state.user.logged_in,
//     logo: state.app.logo
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         dispatchLogin: () => {
//             dispatch({
//                 type: "LOG_IN"
//             })
//         }
//     }
// }

// export default Login = connect(mapStateToProps, mapDispatchToProps)(Login)