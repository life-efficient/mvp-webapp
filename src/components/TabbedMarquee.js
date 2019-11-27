import React, { Component } from "react"
import { css } from "@emotion/core"

const style = css`
    font-family: var(--font1);
    width: 100%;

    .tabs {
        display: flex;
        flex-direction: row;
        width: 100%;
        box-sizing: border-box;
        justify-content: space-around;
        padding: 20px;
    }

    .tab {
        cursor: pointer;
        font-size: 25px; 
        font-weight: 600;   
        width: 30%;
        padding: 20px
    }

    .tab-sections {
        display: flex;
        flex-direction: row;
        overflow: hidden;
        marginTop: 0
    }

    .tab-section {
        transition-duration: 0.5s;
        display: relative;
        padding-top: 0px;
        min-height: 35vh;
        min-width: 100%
    }
`

export default class TabbedIndexSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tab: 0
        }
        this.tabs = props.tabs
        this.interval = setInterval(() => {this.setState({tab: (this.state.tab + 1) % this.tabs.length})}, 4000)
    }

    getTab = () => {
        var tabs = [

        ]
        return tabs[this.state.tab]
    }

    handleTabChange = (e) => {
        clearInterval(this.interval)
        this.setState({
            'tab': e.target.id
        })
    }

    render() {
        return (
            <div css={style}>
                <div className="tabs">
                    {
                        this.tabs.map(
                            (i, idx) => {
                                return (
                                    <div id={idx} className="tab" style={{opacity: this.state.tab == idx ? 1 : 0.4, transitionDuration: '0.5s', textDecoration: this.state.tab == idx ? 'underline': null}} onClick={this.handleTabChange}>
                                        {i.name}
                                    </div>
                                )
                            }
                        )
                    }
                </div>
                <div className="tab-sections">
                    {
                        this.tabs.map(
                            (i) => {
                                return (
                                    <div style={{transform: `translateX(${- this.state.tab * 100}%)`}} className="tab-section">
                                        {i.html}
                                    </div>
                                )
                            }
                        )
                    }
                </div>
            </div>
        )
    }
}
