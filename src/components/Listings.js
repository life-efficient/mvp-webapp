import React from "react"
import Listing from "./Listing"
import { css, jsx } from "@emotion/core"
/** @jsx jsx */

const style = css`
    display: flex;
    max-width: 1000px;
    margin: 40px auto;
    flex-wrap: wrap;
    flex-direction: column;
`

export default (props) => {
    return (
        <div css={[style, props.style]}>
            {props.tiles.map((t) =>{ return (<Listing {...t}/>)})}
        </div>
    )
}