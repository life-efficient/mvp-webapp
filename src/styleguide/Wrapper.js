import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore } from "redux"
// import { withTheme, ThemeProvider } from 'emotion-theming'
import { css, Global } from '@emotion/core'
// import configureStore from '../utils/configureStore'

const initialState = () => {
    return {
        app: {
            name: 'MVP'
        }
    }
}

const store = createStore(initialState)

export default class Wrapper extends Component {
  render() {
    return <Provider store={store}>

        {this.props.children}
    </Provider>
  }
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