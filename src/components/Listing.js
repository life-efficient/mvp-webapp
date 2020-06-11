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

const get_style = (props)=>{
    return css`
        //animation-name: ${expand_in};
        animation-duration: 1s;
        --dim: ${props.size?props.size:200}px;
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
    `
}

const get_listing_style = (props)=>{
    return css`
    //justify-content: space-between;
    width: 95%;
    //cursor: pointer;
    img{
        max-height: 45vw;
        max-width: 45vw;
        width:90%;
        max-width: 95%;
        max-height:95%;
        object-fit:contain;
    }
    svg{
        width:90%;
        height:90%;
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
            min-height: ${props.size?props.size/2.5:56}px;
            max-height: ${props.size?props.size/2.5:56}px;
            min-width: ${props.size?props.size/2.5:56}px;
            max-width: ${props.size?props.size/2.5:56}px;
            min-width: 0px;
            //border-radius: 0;
        }
        .deletebtn{
            position: absolute;
            top: 5px;
            right: ${props.size?(10+(props.size/2.5)):70}px;
            background-color: #ff3333;
                min-height: ${props.size?props.size/2.5:56}px;
                max-height: ${props.size?props.size/2.5:56}px;
                min-width: ${props.size?props.size/2.5:56}px;
                max-width: ${props.size?props.size/2.5:56}px;
            min-width: 0px;
            //border-radius: 0;
        }
        .deletebtn:hover{
            background-color: #cc0000;
        }
    }
    `
}
const add_listing_style = css`
    //justify-content: space-between;
    width: 95%;
    //cursor: pointer;
    font-size: ${props.size?props.size/2:100}px;
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

    render () {
        const k = 0.1 * 2* 3.1415926
        switch(this.props.type){
            case "add":
                return (
                    <div css={[get_style(this.props), add_listing_style, this.props.style]} onClick={this.props.onClick}>
                        <FontAwesomeIcon icon={faPlus} className="faicon"/>
                    </div>
                )
            default:
                return (
                    <div css={[get_style(this.props), get_listing_style(this.props), this.props.style]} onClick={this.props.onClick}>
                            {this.props.img ? <div className="imgcontainer"><img src={this.props.img} alt="company_logo"></img></div>: null}
                            {this.props.icon ? <div className="imgcontainer">{this.props.icon}</div>: null}
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