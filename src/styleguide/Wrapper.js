import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore } from "redux"
import { BrowserRouter as Router } from "react-router-dom"
import { ThemeProvider } from 'emotion-theming'
import { css, Global } from "@emotion/core"
// import { withTheme, ThemeProvider } from 'emotion-theming'
// import { css, Global } from '@emotion/core'
// import configureStore from '../utils/configureStore'

const initialState = () => {
    return {
        app: {
            name: 'MVP',
            theme: {
            }
            // css`
            //     color1: black;
            //     color2: red;
            //     font-family: 'Roboto';
            //     color: red
            // `
        }
    }
}

window.theme = {
    color1: 'black',
    color2: 'orange',
    fontSize: '30px',
    fontFamily: 'Roboto'
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

                        *{
                            text-transform: uppercase;
                            // font-size: 1.5em;
                            font-weight: bold;
                            letter-spacing: 4px;
                        }
                    `}
                />
                {/* <ThemeProvider theme={store.getState().app.theme}> */}
                    {props.children}
                {/* </ThemeProvider> */}
            </Provider>
        </Router>
    )
}


// TRYING TO GLOBALLY STYLE
// import React, { Component } from 'react'
// import { Provider } from 'react-redux'
// import { createStore } from "redux"
// import { withTheme, ThemeProvider } from 'emotion-theming'
// import { css, Global } from '@emotion/core'
// // import configureStore from '../utils/configureStore'

// const initialState = () => {
//     return {
//         app: {
//             name: 'Pizza Delivery'
//         }
//     }
// }

// const makeGlobalStyles = theme => css`
//   * {
//     border: 3px solid red;
//     // background: ${theme.bg};
//   }
// `

// const GlobalStyles = withTheme(({ theme }) => (
//     <Global styles={makeGlobalStyles(theme)} />
// ))

// const GloballyStyledApp = () => <main>
//     <GlobalStyles />
// </main>

// const store = createStore(initialState)

// export default class Wrapper extends Component {
//   render() {
//     return <Provider store={store}>
//         <ThemeProvider theme={{bg: 'red'}}>
//             <GloballyStyledApp />
//             {this.props.children}
//         </ThemeProvider>
//     </Provider>
//   }
// }