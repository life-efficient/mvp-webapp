import React from "react"
import { css } from "@emotion/core";
// import "./AnimatedBackground.css"
import { bkgd, squares } from "../styles/background"

export default (props) => {
    const bkgd = css`
        background: var(--color1);
        
        background: linear-gradient(var(--color1), var(--color1g));
        width: 100%;
        min-height: 92vh;
        height: 100%;
        position: absolute;

        position: ${props.test ? 'absolute': 'fixed'};
        top: 0;
        width: 100vw;
        height: 100vh;
        box-sizing: border-box;
        z-index: 0;
        // overflow: hidden;
    `
    switch(props.option) {
        case 'squares':
            return (
                <div css={bkgd}>
                    <ul css={squares} style={{paddingTop: 0}}>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div >
            )
        default:
            return (
                <div css={bkgd}>yo</div>
            )
    }
}