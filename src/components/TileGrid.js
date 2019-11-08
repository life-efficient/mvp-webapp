import React from "react"
import { Tile } from "mvp-webapp"
import { css } from "@emotion/core"

const style = css`
    display: flex;
    max-width: 1000px;
    margin: auto;
    flex-wrap: wrap;
    justify-content: center;
`

export default (props) => {
    return (
        <div css={style}>
            {props.tiles.map((t) =>{ return (<Tile {...t}/>)})}
        </div>
    )
}