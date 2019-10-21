import React, { Component } from "react";
import styled from "@emotion/styled";
import { font, primaryColors, shape } from "styles/styles";
import { connect } from "react-redux"

const Wrapper = styled.button`
  ${font}
  ${primaryColors}
  ${shape}
`;

// var Button = (props) => {
//   return (
//     <Wrapper>
//       App name: {props.app.name}
//     </Wrapper>
//   )
// }
class Button extends Component {
  render() {
    return (
          <Wrapper>
        {/* State: {JSON.stringify(this.props.state)} */}
        {/* Props: {JSON.stringify(this.props)} */}
        App name: {this.props.state.app.name}
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('STATE IN BTN:', state)
  return {
    state,
    app: state.app.name.yo
  }
}

export default Button 
= connect(mapStateToProps)(Button)