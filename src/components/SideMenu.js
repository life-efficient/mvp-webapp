import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Auth } from "aws-amplify"
import { connect } from "react-redux"
import { css } from "@emotion/core"

const style = css`
    height: 100%;
    width: 0;
    max-width: 70vw;
    position: fixed;
    z-index: 3;
    top: 0;
    left: 0;
    overflow-x: hidden;
    transition: 0.5s;
    font-family: var(--font1);
    display: flex;
    flex-direction: column;
    background-color: var(--color2) ;

    width: 70%;
    box-shadow: var(--shadow);
    
    a {
        margin: 2vh auto;
        text-decoration: none;
        font-size: var(--nav-item-size);
        font-size: 5vh;
        color: black;
        transition: 0.3s;
        text-align: center;
    }
    
    a:hover {
        color: #f1f1f1;
    }
    

    .closebtn {
    top: 0;
    font-size: 7vh;
    float: left;
    width: 10vw;
    lposition: absolute;
    color: var(--nude);
    }

    .closebtn:hover {
        cursor: pointer;
    }
`

class SideMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ready: false
        }
        console.log('open:', this.props.open)
    }

    logout = () => {
        Auth.signOut()
        .then(data => console.log(data))
        .catch(err => console.log(err));
        this.props.toggleMenu
    }

    // FOR CLOSING ON OUTSIDE CLICK
    componentDidMount = () => {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    componentWillUnmount = () => {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    setWrapperRef = (node) => {
        this.wrapperRef = node;
    }
    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            if (this.props.open) {
                this.props.toggleMenu()
            }
        }
    }

    getStyle = () => {
        //var bkgd = this.props.open ? {display: "relative"} : {display: "none"}
        var width = this.props.open ?  "600px" : "0px"
        var style = {
            width: width
        }
        return style
    }

    render() {
        console.log('logged in:', this.props.logged_in)
        return (
            <div id="mySidenav" css={style} style={this.getStyle()} ref={this.setWrapperRef}>
                <div className="closebtn" onClick={this.props.toggleMenu}>&times;</div>
                <Link to="/" onClick={this.clickLogout}>Log out</Link>
                {
                    this.props.links ? this.props.links.map((l)=>{
                        <Link to={l.to} onClick={this.props.toggleMenu}>{l.title}</Link>
                    })
                    :
                    null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return  {
        open: state.menu.open
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleMenu: () => {dispatch({
            type: "TOGGLE_MENU"
        })}
    }
}

export default SideMenu = connect(mapStateToProps, mapDispatchToProps)(SideMenu)