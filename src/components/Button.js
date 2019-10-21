import React from "react";
import styled from "@emotion/styled";
import { font, primaryColors, shape } from "styles/styles";
import { connect } from "react-redux"

const Wrapper = styled.button`
  ${font}
  ${primaryColors}
  ${shape}
`;

const mapStateToProps = (state) => {
  return {
    app: state.app
  }
}


var Button = (props) => {
  return (
    <Wrapper>
      App name: {props.app.name}
    </Wrapper>
  )
}

export default Button 
= connect(mapStateToProps)(Button)
