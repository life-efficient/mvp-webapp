import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore } from "redux"
import { BrowserRouter as Router } from "react-router-dom"
import { ThemeProvider } from 'emotion-theming'
import { css, Global } from "@emotion/core"
import logo from "../images/external/logo.png"
import { combineReducers } from 'redux'

import Amplify from 'aws-amplify';
Amplify.configure({
    Auth: {

        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        identityPoolId: 'eu-west-2:a9b6789c-da76-4a3e-ae38-93373981ff11',
        
        // REQUIRED - Amazon Cognito Region
        region: 'eu-west-2',

        // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
        // Required only if it's different from Amazon Cognito Region
        //identityPoolRegion: 'eu-west-2',
 
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'eu-west-2_XRYfK4o2B',

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '12rljt0gbcrc780r5tdeoctdvk',

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySign:true
    },
    Storage: {
        AWSS3: {
            bucket: 'theaicore-data', //REQUIRED -  Amazon S3 bucket
            region: 'eu-west-2', //OPTIONAL -  Amazon service region
        }
    }
});

//Amplify.Auth.signIn('haron@theaicore.com', 'password').then((response)=>(console.log(response)))


const app = () => {

    return {
            name: 'MVP',
            logo,
            address: 'my business address, P0STC0D3',
            contact: '0123456789'
        }
    }
//         modal: {
//             open: false
//         },
//         slideIn: {
//             open: false
//         },
//         payment: [
//             {
//                 name: 'product1',
//                 price: 'price1',
//             }
//         ]
//     }
// }

const slideIn = (state={open: false, content: null}, action) => {
    switch (action.type) {
        case "OPEN_SLIDEUP":
            console.log('opening slideup')
            return {
                open: true,
                content: action.content
            }
        case "CLOSE_SLIDEUP":
            console.log('closing slideup')
            return {
                open: false,
                content: null
            }
        default:
            return state
    }
}

const modal = (state={open: false, content: null}, action) => {
    switch (action.type) {
        case "OPEN_MODAL": 
            console.log('opening modal')
            return {
                open: true,
                content: action.content
            }
        case "CLOSE_MODAL":
            console.log('closing modal')
            return {
                open: false,
                content: null
            }
        default:
            return state
    }
}

const menu = (state = {open: false}, action) => {
    switch (action.type) {
        case "TOGGLE_MENU" :
            // if (state.open) { // if currently open (i.e. being closed)
            //     action.content = null // set the content to null
            // }
            console.log('toggling sidenav')
            return {
                ...state,
                open: !state.open,
                content: action.content
            }
        default:
            return state
    }
}


const reducer = combineReducers({
    app,
    modal,
    slideIn,
    menu
})

const store = createStore(reducer)

import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    text: {
        main: '#ff822e'
    }
  },
});

export default (props) => {

    return (
        <Router>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <Global
                        styles={css`
                            a:link { color: black;text-decoration: none; }
                            a​:visited {  color: black; text-decoration: none;}
                            a​:hover {  color: black; }
                            a { color: black;}

                            // *{
                            //     text-transform: uppercase;
                            //     // font-size: 1.5em;
                            //     font-weight: bold;
                            //     letter-spacing: 4px;
                            // }
                        `}
                    />
                    {props.children}
                </ThemeProvider>
            </Provider>
        </Router>
    )
}