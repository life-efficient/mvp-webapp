import React from "react"
import { jsx, css } from "@emotion/core"

const style = css`
    display: flex;
    overflow: hidden;
    max-width: 100%;
    min-height: 200px;
    font-family: var(--font1);
    > * {
        animation: translate 50s linear infinite;
        min-height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-width: 200px;
        max-width: 600px;
        align-items: center;
        margin: 0 20px;
    }

    img {
        max-height: 200px;
        margin: 5px;
        border-radius: var(--radius);
        min-width: auto;
        max-width: auto;
    }

    @keyframes translate {
        to {transform: translateX(-1000px)}
    }
`

export default (props) => {
    return (
        props.items ?
        <div css={style}>
            {props.items.map((i, idx)=>{
                switch (props.type) {
                    case "img":
                        return (<img src={i} alt=''/>)
                    case "html":
                        return i
                }
            })}
        </div>
        :
        null
    )
}