import React, { Component } from "react";
import styled from "@emotion/styled";
import { font, primaryColors, shape } from "styles/styles";
import { connect } from "react-redux"

const Wrapper = styled.button`
  ${font}
  // ${primaryColors}
  ${shape}
  background-color: ${window.theme.color2};
`;

class Button extends Component {
  render() {
    return (
          <Wrapper 
          // css={this.props.app.theme}
          >
        {/* State: {JSON.stringify(this.props.state)} */}
        {/* Props: {JSON.stringify(this.props)} */}
        App name: {this.props.state.app.name}
        {/* {window.maintheme.yo}
        <div css={this.props.theme}>
          yo
        </div>
        {JSON.stringify(Object.keys(this.props))} */}
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('STATE IN BTN:', state)
  return {
    state,
    app: state.app
  }
}

export default Button 
= connect(mapStateToProps)(Button)