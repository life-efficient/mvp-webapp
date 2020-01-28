import React from "react"
import { css } from "@emotion/core"
import { connect } from "react-redux"
import twitter from "../images/socials/twitter.png"
import linkedin from "../images/socials/linkedin.png"
import facebook from "../images/socials/facebook.png"

const style = css`
    color: var(--color2);
    background-color: black;
    height: 8vh;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
    font-family: var(--font1);
    
    > div {
        max-width: 30vw;
    }

    .socials {
        height: 100%;
        > img {
            max-height: 60%;
            padding: 15px;
            cursor: pointer;
        }
        display: flex;
        align-items: center;
    }
`

const social_icons = {
    'twitter': twitter,
    'linkedin': linkedin,
    'facebook': facebook
}

var Footer = (props) => {
    var socials = props.socials
    return (
        <div css={style}>
            <div>
                {props.address}
            </div>
            <div className='socials'>
                {
                    props.socials ?
                    Object.keys(socials).map((s)=>{return <img src={social_icons[s]} onClick={()=>{window.open(socials[k])}}/>})
                    :
                    null
                }
            </div>
            <div>
                {props.contact}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        address: state.app.address,
        contact: state.app.contact
    }
}

export default Footer = connect(mapStateToProps)(Footer)