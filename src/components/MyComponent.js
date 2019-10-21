import React from "react";
import styled from "@emotion/styled";
import { font, primaryColors, shape } from "config/styles";

const Wrapper = styled.div`
  ${font}
  ${primaryColors}
  ${shape}
`;

export default function MyComp({ text, onClick }) {
  return <Wrapper onClick={onClick}>{text}</Wrapper>;
}
