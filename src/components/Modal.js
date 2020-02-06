import React, { Component } from "react"
import { connect } from "react-redux"
import cross from "../images/cross-filled.png"
import { css } from "@emotion/core"

const container = css`
    height: 100vh;
    background-color: rgb(0, 0, 0, 0.8);
    z-index: 100;
    position: fixed;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 0px;
    height: 100vh;
    width: 100vw;
    transition-duration: 0.5s;
    -webkit-transition: opacity 0.5s ease-in-out;
    -moz-transition: opacity 0.5s ease-in-out;
    -ms-transition: opacity 0.5s ease-in-out;
    -o-transition: opacity 0.5s ease-in-out;

    .modal {
        /* background-image: url('../images/gradient.png'); */
        background-color: var(--secondary);
        background-size: 100vw 100%;
        border-radius: 6px;
        max-width: 90%;
        max-height: 90%;
        display: flex;
        flex-direction: column;
        padding: 30px; 
        position: relative;
    }

    .modal-closebtn {
        color: black;
        position: absolute;
        left: 10px;
        top: 10px;
        height: 20px;
        cursor: pointer;
        z-index: 100;
    }

    .modal-content {
        margin-top: 60px;
        margin: auto;
        position: relative;
        width: 80%;
        height: 80%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
`

class Modal extends Component {

    handleClick = (e) => {
        e.stopPropagation()
        if (this.node.contains(e.target)) {
            return
        }
        else {this.props.closeModal()}
    }

    render() {
        return (
            <div css={container} style={this.props.modalOpen ? {opacity: 1, zIndex: 10} : {opacity: 0, zIndex: -1}} onClick={this.handleClick}>
                <div className="modal" ref={node => this.node=node}>
                    <img className="modal-closebtn" onClick={this.props.closeModal} src={cross} alt="" />
                    {this.props.content}                
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log(state.modal)
    return {
        modalOpen: state.modal.open,
        content: state.modal.content
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => {
            dispatch({type: "CLOSE_MODAL"})
        }
    }
}

export default Modal = connect(mapStateToProps, mapDispatchToProps)(Modal)