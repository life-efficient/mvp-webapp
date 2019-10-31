/** @jsx jsx */
import React from "react"
// import "./Loading.css"
import styled from "@emotion/styled";
import { jsx, css } from "@emotion/core"
import { font, primaryColors, shape } from "styles/styles";
import * as rs from "react-spinners"

const container = css`
    ${primaryColors}
    border-radius: 3px;
    padding: 2px;
    --dim: 40px;
    width: var(--dim);
    height: var(--dim);
    margin-top: 10px;
    margin: auto;
    display: flex;
    justify-content: center;
    background-color: var(--color1);
    // background-color: inherit;
    align-items: center;
    overflow: visible;
    div {
        width: 80%;
        height: 80%;
    }
`

const Loading = (props) => {
    return (
        <div style={{margin: 'auto', display: 'flex', justifyContent: 'center', width: '100%'}}>
            <rs.RingLoader color={'var(--color2)'} size={30} sizeUnit={'px'} />
        </div>
     )
}
export default Loading