import React from "react"
import Form from "./Form"
import { Auth } from "aws-amplify"
import { connect } from "react-redux"
import { panel } from "../styles/theme"

var Signup = (props) => {
    return(
        <div css={panel} >
            <img src={props.logo} style={{height: '200px', margin: '40px'}} alt=""/>
            <Form 
                redirect='/app'
                slides={[
                    {
                        title: 'Make an account',
                        questions: [
                            {
                                title: 'Email',
                                type: 'email',
                                id: 'email',
                            },
                            {
                                id: 'password',
                                type: 'confirm-password',
                            }
                        ],
                        onSubmit: async (e) => {
                            console.log('signing up')
                            await Auth.signUp(e.email, e.password)
                        }
                    },
                    {
                        title: 'Confirm your email',
                        questions: [
                            {
                                title: 'Code',
                                id: 'code',
                                type: 'text',
                            }
                        ],
                        detail: <div className="detail" style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={()=> {Auth.resendSignUp(e.email).then(()=>console.log('resent successfully').catch((e)=>console.log(e)))}}>
                            Resend
                        </div>,
                        onSubmit: async (e) => {
                            console.log('confirming and logging in')
                            await Auth.confirmSignUp(e.email, e.code)
                            await Auth.signIn(e.email, e.password)
                            props.post_signup_fn ? await props.post_signup_fn(e):null
                        }
                    },
                ]}
            />
        </div>
    )
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

export default Signup = connect(mapStateToProps, mapDispatchToProps)(Signup)