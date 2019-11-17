import React from "react"
import { css } from "@emotion/core"
import { connect } from "react-redux"

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
`

var Footer = (props) => {
    return (
        <div css={style}>
            <div>
                {props.address}
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