import React from "react"
import { jsx, css } from "@emotion/core"

const style = css`
    display: flex;
    overflow: hidden;
    img {
        max-height: 200px;
        animation: translate 50s linear infinite;
        margin: 5px;
        border-radius: var(--radius);
    }

    @keyframes translate {
        to {transform: translateX(-1000px)}
    }
`

export default (props) => {
    return (
        props.items ?
        <div css={style}>
            {props.items.map((i, idx)=>{return (
                <img src={i} alt={`image ${idx}`} css={css``}/>
            )})}
        </div>
        :
        null
    )
}