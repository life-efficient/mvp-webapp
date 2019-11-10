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
                        ],
                        onSubmit: async (e) => {
                            try {
                                await Auth.signUp(e.email, e.password)
                            }
                            catch (err) {
                                console.log('sumbission error:', err)
                                return err.message ? err.message : 'Something went wrong'
                            }
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
                        onSubmit: async (e) => {
                            try {
                                await Auth.confirmSignUp(e.email, e.code)
                            }
                            catch (err) {
                                console.log('sumbission error:', err)
                                return err.message ? err.message : 'Something went wrong'
                            }
                        }
                    },
                    {
                        title: 'Create a password',
                        questions: [
                            {
                                id: 'password',
                                type: 'confirm-password',
                            }
                        ],
                        onSubmit: async (e) => {
                            try {
                                await Auth.signIn(e.email, e.password)
                            }
                            catch (err) {
                                console.log('sumbission error:', err)
                                return err.message ? err.message : 'Something went wrong'
                            }
                        }
                    }
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