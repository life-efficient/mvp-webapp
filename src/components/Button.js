import React, { Component } from "react";
import styled from "@emotion/styled";
import { font, primaryColors, shape } from "styles/styles";
import { connect } from "react-redux"
import { button } from "../styles/theme"

const Wrapper = styled.button`
  ${font}
  // ${primaryColors}
  ${shape}
  // background-color: ${color2};
`;

class Button extends Component {
  render() {
    return (
      // <button css={}>

      <button css={button} onClick={this.props.onClick}>
        {this.props.text}
      </button>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('STATE IN BTN:', state)
  return {
    state,
    app: state.app,
    theme: state.theme
  }
}

export default Button 
= connect(mapStateToProps)(Button)