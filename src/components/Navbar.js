import React from "react"
import { Link } from "react-router-dom"
// import logo from "../images/logo.png"
import { connect } from "react-redux"
// import "./Navbar.css"
import { jsx, css } from "@emotion/core"
import { button, breakpoints } from "../styles/theme"
import theme from "../styles/theme"
import Button from "./Button"

const navbar_container = css`
    position: relative;
    height: 8vh;
    // display: flex;
    // flex-direction: row;
    // justify-content: space-between;
    // background-color: var(--secondary) ;
    // background: linear-gradient(var(--secondary), var(--secondary_grad));
    color: var(--color2) !important;
    // box-sizing: border-box;
    background-color: var(--color1);
`

const navbar = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: '8vh',
    padding: '10px',
    boxSizing: 'border-box',
}

const options = css`
    width: 100%;
    height: 4vh;
    margin: auto;
    display: flex;
    flex-direction: row;
    position: absolute;
    font-size: 20px;
    color: var(--color2);
    font-family: var(--font1);
    margin-top: 8vh;
    justify-content: space-between;
    background-color: black;
    top: 0vh;

    ${breakpoints[0]} {
        margin-top: 0vh;
        height: 100%;
        background-color: transparent;
        justify-content: center;
    }
`

const option = css`
    padding: 0 10px;
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--color2) !important;
    max-width: 100px;
`

const logo_text = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: var(--color2);
    font-family: var(--font1);
    font-size: 40px;
    z-index: 1;
`

var Navbar = (props) => {
            return (
                <div css={navbar_container}>
                    <div css={navbar}>
                        <Link to="/" css={logo_text}>
                            {props.name}
                        </Link>
                        <Button onClick={props.action_cb} css={button}>
                            {props.call_to_action ? props.call_to_action : 'Take action'}                            
                        </Button>
                    </div>
                    <div
                     css={options}
                     >
                        {
                            ['about', 'work', 'team']
                            .map(
                                (l) => {return <Link css={option} to={`/${l}`}>{l.toUpperCase()}</Link>}
                            )
                        }
                    </div>
                </div>
            )
    // switch (true) {
    //     case true:
    //     default:
    //         return (
    //             null
                // <div className="landing-navbar" >
                //     <Link to={"/"} className="navbar-logo-link" style={{float: "left"}}>
                //         <img src={logo} className="navbar-logo" alt="" />
                        
                //     </Link>
                    
                //     <div className="landing-nav-right" style={{color: 'black'}}>
                //         <Link to="/login" >Login</Link>
                //         {/* <Link to="/help" >Help</Link> */}
                //     </div>
                // </div>
    //         )
    // }
}

const mapStateToProps = (state) => {
    return {
        // logged_in: state.user.logged_in
        name: state.app.name
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openModal: (content) => {
            dispatch({
                type: 'OPEN_MODAL',
                content
            })
        }
    }
}

export default Navbar = connect(mapStateToProps, mapDispatchToProps)(Navbar)