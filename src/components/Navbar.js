import React from "react"
import { Link } from "react-router-dom"
import logo from "../images/logo.png"
import { connect } from "react-redux"
// import "./Navbar.css"
import { jsx, css } from "@emotion/core"
import { button } from "../styles/theme"
import theme from "../styles/theme"

const navbar_container = css`
    position: relative;
    height: 8vh;
    // display: flex;
    // flex-direction: row;
    // justify-content: space-between;
    // background-color: var(--secondary) ;
    // background: linear-gradient(var(--secondary), var(--secondary_grad));
    // color: var(--secondary) !important;
    // box-sizing: border-box;
    background-color: ${window.theme.color1};
    color: ${window.theme.color2};
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
    boxSizing: border-box;
    display: flex;
    flex-direction: row;
    marginTop: 0px;
    position: absolute;
    top: 2vh;
    justify-content: center;
    font-size: 40px;
    color: ${window.theme.color2};
`

const option = css`
    padding: 10px';
    width: '10%';
    display: 'flex';
    flexDirection: 'column';
    justifyContent: 'center'
    color: ${window.theme.color2};
`

var Navbar = (props) => {
            return (
                <div css={navbar_container}>
                    <div css={navbar}>
                        <Link to="/" css={{display: 'flex', flexDirection: 'column', justifyContent:'center', color: window.theme.color2}}>
                            Perks
                        </Link>
                        <button onClick={() => props.openModal('Call +447765892392')} css={button}>
                            GET STARTED                            
                        </button>
                    </div>
                    {/* <div css={options}>
                        {
                            ['about', 'work', 'team'].map(
                                (l) => {return <Link css={option} to={`/${l}`}>{l.toUpperCase()}</Link>}
                            )
                        }
                    </div> */}
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