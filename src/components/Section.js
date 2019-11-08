import React, { Component } from "react"
import { Link } from "react-router-dom"
import arrow from "../images/arrow.png"
import { withRouter } from "react-router-dom"
import { css } from "@emotion/core"

const section = css`
    background-color: var(--color2) ;
    background: linear-gradient(var(--color2), var(--color2g));

    color: var(--color1);

    background-size: 100vw 100%;
    max-width: 600px;
    padding: 10px;
    margin: 5px auto;
    text-align: left;
    display: flex;
    justify-content: space-between;
    animation: slide-in 0.5s ease-out;
    animation-fill-mode: both;
    box-shadow: var(--shadow);
    border-radius: var(--radius);


    @keyframes slide-in {
        0% {
            transform: translateX(100vw);
        }
        100% {
            transform: translateX(0vw)
        }
    }

    @media (min-width: 600px) {
    }

    .section > div {
        display: flex;
        flex-direction: column;
    }

    .section-title {
        font-size: var(--small);
        font-family: var(--font2);
        font-weight: 1000;
    }

    .section-caption {
        font-size: var(--small);
        font-family: var(--font1);
    }

    .section > img {
        height: 3vh;
        display: inline;
    }

    .arrow {
        height: 40px;
    }
`


export default class Section extends Component {

    render() {
        return (
            <Link to={{
                pathname: this.props.to,
                search: this.props.search,
                state: this.props.passthrough
            }}
                css={section}
                style={this.props.idx ? {animationDelay: `0.${this.props.idx}s`} : null}
                >
                <div>
                    <div className="section-title">{this.props.title}</div>
                    <div className="section-caption">{this.props.caption}</div>
                </div>
                <img src={arrow} className='arrow' alt=""/>
            </Link>
        )
    }
}

// export default Section 
// = withRouter((Section))