/** @jsx jsx */
import React from "react"
// import "./Loading.css"
import styled from "@emotion/styled";
import { jsx, css } from "@emotion/core"
import { font, primaryColors, shape } from "styles/styles";

const container = css`
    ${primaryColors}
    border-radius: 30px;
    padding: 5px;
    --dim: 30px;
    width: var(--dim);
    height: var(--dim);
    margin-top: 10px;
    margin: auto;
    display: flex;
    justify-content: center;
    background-color: ${ window.theme? window.theme.primary: null};
`

const loading = css`
    width: 20px;
    height: 20px;
    background-color: black;
    border-radius: 100vw;
    -webkit-animation:spin 2s linear infinite;
    -moz-animation:spin 2s linear infinite;
    animation:spin 2s linear infinite;
    margin: auto;
`

const segment = css`
    height: 10px;
    width: 10px;
    background-color: green;
    ${primaryColors}
`

const inner = css`
    width: 10px;
    height: 10px;
    border-radius: 5px;
    transform: translateX(5px) translateY(-5px);
    background-color: green;
    ${primaryColors}
`

const Loading = (props) => {
    return (
        // <Wrapper>
        <div css={container}>
            <div css={loading} >
            {/* // className="loading"> */}
                <div css={segment}></div>
                <div css={inner}></div>
            </div>
        </div>
     )
}
export default Loading
// import styled from "@emotion/styled";
// import { font, primaryColors, shape } from "config/styles";


// // export default Loading
// export default function Loading() {
//   return <Wrapper onClick={onClick}>{text}
//   yoo there
//   </Wrapper>;
// }