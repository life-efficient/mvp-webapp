import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore } from "redux"
import { BrowserRouter as Router } from "react-router-dom"
import { ThemeProvider } from 'emotion-theming'
import { css, Global } from "@emotion/core"
import logo from "../images/external/logo.png"
import { combineReducers } from 'redux'

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

export default (props) => {

    return (
        <Router>
            <Provider store={store}>
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
                {/* <ThemeProvider theme={store.getState().app.theme}> */}
                    {props.children}
                {/* </ThemeProvider> */}
            </Provider>
        </Router>
    )
}