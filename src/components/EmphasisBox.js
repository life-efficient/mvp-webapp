import React, { Component } from "react";
import { css } from "@emotion/core";

const style = css`
    font-family: var(--font1);
    background: #f3f4f7;
    margin: 1.875rem 0 1.125rem 0;
    color: #262626;
    border-radius: 5px;

    > .emphasis-title{
        border-radius: 5px 5px 0 0;
        background: var(--color2);
        color: #fff;
        text-transform: uppercase;
        margin: 1.125rem 0;
        padding: 3px 0 3px 1.375rem;
        position: relative;
    }

    > .emphasis-content{
        margin-bottom: 0;
        padding: 0 1.375rem 1.125rem;
        margin-top: 1.125rem;
    }
    `

export default (props) => {
    return(
        <div className="emphasis-box" css={style}>
            <p className="emphasis-title">{props.title}</p>
            <p className="emphasis-content">{props.content}</p>
        </div>
    )
}