import React from "react"
import { Link } from "react-router-dom"
// import logo from "../images/logo.png"
import { connect } from "react-redux"
// import "./Navbar.css"
import { jsx, css } from "@emotion/core"
import { button, breakpoints } from "../styles/theme"
import theme from "../styles/theme"
import Button from "./Button"

const style = css`
    position: relative;
    height: 8vh;
    min-height: 71px;
    color: var(--color2) !important;
    background-color: var(--color1);
    background-color: transparent;
    z-index: 1;

    // .btn {
    //     color: var(--color1);
    // }

    .navbar {
        display: flex;
        box-sizing: border-box;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: nowrap;
        flex-shrink: 2;
        // width: 100%;
        padding: 10px;
        boxSizing: border-box;
        max-height: 100%;
        a {
            min-width: auto;
        }
    }

    .options {
        border: 1px solid red;
        max-width: 100%;
        height: 4vh;
        margin: 20px 0;
        display: flex;
        flex-direction: row;
        position: absolute;
        font-size: 20px;
        color: var(--color2);
        font-family: var(--font1);
        margin-top: 8vh;
        justify-content: space-between;
        background-color: transparent;
        a​:visited, a:link, a:hover, a {  
            color: var(--color2); 
            text-decoration: none;
        }

        top: 0vh;

        ${breakpoints[3]} {
            margin-top: 0vh;
            height: 100%;
            justify-content: center;
            width: 60%;
            left: 20%;
            // margin: 0 auto;
        }
    }

    .option {
        padding: 0 10px;
        width: 30%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 1;
    }

    .logo_text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-family: var(--font1);
        font-size: 30px;
        z-index: 1;
        float: left;
        a​:visited, a:link, a:hover, a {  
            color: var(--color2) !important; 
            text-decoration: none;
        }
        color: var(--color2) !important;
    }
`

var Navbar = (props) => {
    // var back_to = props.back

    var root = props.root
    var to = window.location.pathname
    console.log('root:', root, 'to:', to)
    if (root != to) {
        console.log('current pathname:', window.location.pathname)
        to = to.split('/')
        to = to.slice(0, to.length - 1)
        to = to.join('/')
        console.log('GOING BACK TO:', to)
    }

    // back_to = back_to === true ? '/' : back_to
    
    //document.referrer
    // back_img = <img src={back_icon}/>
    var content = root ? 'back' : props.name // case 1: back prop is not given -> set content of button to name of app. back_to remains as null
    // if (props.roots && props.roots.includes(window.pathname)) { // if array of roots contains this path
    if (root && window.location.pathname === root) { // if already at root // if array of roots contains this path
        content = props.name // back button should show name of app
        to = root // and just route back to where we are currently when they press it
    }

    return (
        <div css={style}>
            <div className="navbar">
                <Link to={to} className="logo_text">
                    {content}
                </Link>
                <Button onClick={props.action} css={css`z-index: 1; min-width: auto;`} text={props.btn} to={props.to}/>
            </div>
            <div
                className="options"
                >
                {
                    props.links ?
                    props.links 
                    .map(
                        (l) => {return <Link className="option" to={`/${l}`}>{l.toUpperCase()}</Link>}
                    )
                    :
                    null
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