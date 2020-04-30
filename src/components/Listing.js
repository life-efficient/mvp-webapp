import React, { Component } from "react"
import ReactDOM from "react-dom"
import { expand_in } from "../styles/animations"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { keyframes } from "@emotion/core"

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {withTheme} from "@material-ui/core"
import Fab from '@material-ui/core/Fab';
import { css, jsx } from "@emotion/core"
/** @jsx jsx */

const style = css`
    //animation-name: ${expand_in};
    animation-duration: 1s;
    --dim: 200px;
    height: var(--dim);
    //width: var(--dim);
    //max-width: 45vw;
    max-height: 45vw;
    box-sizing: border-box;
    background-color: var(--color2);
    background: linear-gradient(var(--color2), var(--color2g));
    font-family: var(--font1);
    font-size: 25px;
    font-weight: 1000;
    margin: 10px;
    box-shadow: var(--shadow);
    
    display: flex;
    flex-direction: row;
    justify-content: center;
    
    transition: 0.5s;
    color: var(--color1);
    border-radius: var(--radius);
    @media (max-width: 600px) {
        font-size: 16px;
    }
    img, .faicon {
        //height: 50%;
        //margin: 10%;
        //font-size: 80px;
    }
`

const listing_style = css`
    //justify-content: space-between;
    width: 95%;
    //cursor: pointer;
    img{
        max-height: 45vw;
        max-width: 45vw;
        width:90%;
    }
    div.imgcontainer{
        flex:1;
        display:flex;
        align-items: center;
        justify-content: center;
        background:white;
    }
    div.maincontent{
        position: relative;
        flex:5;
        h4{
            text-align:left;
            margin: 20px 10px;
            margin-bottom: 7px;
        }
        .subheading{
            font-size:20px;
        }
        p{
            font-size: 15px;
            text-align: left;
            margin: 3px 10px;
        }
        .editbtn{
            position: absolute;
            top: 5px;
            right: 5px;
            //width: 60px;
            //height: 60px;
            min-width: 0px;
            //border-radius: 0;
        }
        .deletebtn{
            position: absolute;
            top: 5px;
            right: 70px;
            background-color: #ff3333;
            //width: 60px;
            //height: 60px;
            min-width: 0px;
            //border-radius: 0;
        }
        .deletebtn:hover{
            background-color: #cc0000;
        }
    }
`
const add_listing_style = css`
    //justify-content: space-between;
    width: 95%;
    //cursor: pointer;
    font-size: 100px;
    align-items: center;
    cursor: pointer;
    svg{
        cursor: pointer;
    }
    :hover{
        color: var(--color1g);
    }
`

class Listing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            x: 0,
            y: 0,
            interval: null
        }
        this.interval = null
    }

    tilt = (e) => {
        // console.log(e.clientX)
        var rect = ReactDOM.findDOMNode(this).getBoundingClientRect()
        var w = rect.right - rect.left
        var h = rect.top - rect.bottom
        var next = {
            x: ( e.clientY - rect.top - 0.5*(rect.bottom - rect.top) ) / h,
            y: ( e.clientX - rect.left - 0.5*(rect.right - rect.left) ) / w, 
        }
        console.log(next)
        this.setState(next,
        )
    }

    render () {
        const k = 0.1 * 2* 3.1415926
        switch(this.props.type){
            case "add":
                return (
                    <div css={[style, add_listing_style, this.props.style]} onClick={this.props.onClick}
                        // onMouseLeave={() => {clearInterval(this.i); this.setState({x: 0, y: 0})}} 
                        // onMouseEnter={() => {this.i = setInterval(this.tilt, 100)}} 
                        //style={{transform: `rotateX(${k*this.state.x}rad) rotateY(${k*this.state.y}rad)`, order: '3px solid red'}}
                        >
                        <FontAwesomeIcon icon={faPlus} className="faicon"/>
                        {/*<p>{this.props.valButton:nth-of-type(2)ue}</p>*/}
                    </div>
                )
            default:
                return (
                    <div css={[style, listing_style, this.props.style]} onClick={this.props.onClick}
                        // onMouseLeave={() => {clearInterval(this.i); this.setState({x: 0, y: 0})}} 
                        // onMouseEnter={() => {this.i = setInterval(this.tilt, 100)}} 
                        //style={{transform: `rotateX(${k*this.state.x}rad) rotateY(${k*this.state.y}rad)`, order: '3px solid red'}}
                        >
                        
                            {this.props.img ? <div className="imgcontainer"><img src={this.props.img} alt="company_logo"></img></div>: null}
                        <div className="maincontent">
                            {this.props.title? <h4>{this.props.title}</h4>:null}
                            {this.props.subheading ? <p class='subheading'>{this.props.subheading}</p>: null}
                            {this.props.description ? <p>{this.props.description}</p>:null}
                            {this.props.edit_fn ? <Fab color="primary" aria-label="edit" className="editbtn" onClick={this.props.edit_fn}><EditIcon /></Fab>:null}
                            {this.props.delete_fn ? <Fab color="primary" aria-label="delete" className="deletebtn" onClick={this.props.delete_fn}><DeleteIcon /></Fab>:null}
                            {/*<Button color="primary"></Button>*/}
                        </div>
                        {/*<p>{this.props.value}</p>*/}
                    </div>
                )
        }
        
    }        
}

export default withTheme(Listing)