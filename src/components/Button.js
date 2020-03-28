import React, { Component } from "react";
import styled from "@emotion/styled";
import { font, primaryColors, shape } from "styles/styles";
// import { button } from "../styles/theme"
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { css, jsx } from "@emotion/core"
/** @jsx jsx */

const style = css`
  border: 0;
  box-shadow: var(--shadow);
  border-radius: 3px;
  font-family: var(--font2);
  background-color: var(--color2);
  color: var(--color1);
  cursor: pointer;
  min-width: 150px;
  position: relative;
  transition-duration: 1s;
  text-decoration: none;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;

  img {
    height: 30px;
  }

  :focus {
    outline: 0;
  }

  :active {
    transform: scale(0.9)
  }
`

class Button extends Component {
  render() {
    const text = this.props.text ? this.props.text : 'Pass a "text" prop to the Button!'
    let content = <>
      {this.props.icon ? <img src={this.props.icon} /> : null}
      {text}
    </>
    content = this.props.loading ? <Loading/> : content
    const onClick = this.props.onClick ? this.props.onClick : () => {alert('Pass an "onClick" prop to the button!')}
    if (this.props.to) {
      return (
        <Link css={style} to={this.props.to} >
          {/* <button> */}
            {content}
          {/* </button> */}
        </Link>
      )
    }
    return (
      <button css={style} onClick={onClick}>
        {content}
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
// = connect(mapStateToProps)(Button)