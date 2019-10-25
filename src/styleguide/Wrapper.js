import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore } from "redux"
import { BrowserRouter as Router } from "react-router-dom"
import { ThemeProvider } from 'emotion-theming'
import { css, Global } from "@emotion/core"

const initialState = () => {
    return {
        app: {
            name: 'MVP',
        },
        payment: [
            {
                name: 'product1',
                price: 'price1',
                
            }
        ]
    }
}

const store = createStore(initialState)

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