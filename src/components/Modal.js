import React, { Component } from "react"
import { connect } from "react-redux"
import cross from "../images/cross-filled.png"

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
            <div className="modal-container" style={this.props.modalOpen ? {opacity: 1, zIndex: 10} : {opacity: 0, zIndex: -1}} onClick={this.handleClick}>
                <div className="modal" ref={node => this.node=node}>
                    <img className="modal-closebtn" onClick={this.props.closeModal} src={cross} alt="" />
                    {this.props.content}                
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state.modal)
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