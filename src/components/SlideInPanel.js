import React, { Component } from "react"
import { connect } from "react-redux"
import { css } from "@emotion/core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faTimes } from '@fortawesome/free-solid-svg-icons';

const style = css`
    background-color: var(--color1);
    color: var(--color2);
    width: 100vw;
    position: fixed;
    z-index: 5;
    bottom: 0vh;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    transition: 1s;
    box-shadow: var(--shadow);

    .closebtn {
        padding: 10px;
        color: var(--color2);
        cursor: pointer;
        font-size: 50px;
        text-align: left;
    }

    .content {
        display: flex;
        flex-direction: column;
        justify-content: top;
        align-items: center;
        font-family: var(--font1);
    }

    // .slideIn-content {
    //     width: 100%;
    // }
`

class SlideInPanel extends Component {
    constructor(props) {
        super(props)
        
    }
    render () {
        console.log('slideup props:', this.props)
        console.log('slideup content:', this.props.content)
        return (
            <div css={css`${style}; ${this.props.open ? css`height: 100%;` : css`height: 0vh;`}`}>
                <div className="closebtn large" onClick={this.props.close}>
                    <FontAwesomeIcon icon={faTimes} />
                </div>
                <div className="content">
                    {this.props.content}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        open: state.slideIn.open,
        content: state.slideIn.content
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        close: () => {
            dispatch({
                type: "CLOSE_SLIDEIN",
                //content: content
            })
        }
    }
}

export default SlideInPanel = connect(mapStateToProps, mapDispatchToProps)(SlideInPanel)