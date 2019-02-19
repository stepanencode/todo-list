import styled, {css} from "styled-components";
import InlineSVG from "svg-inline-react";

const Svg = styled(InlineSVG)`
    vertical-align: middle;
    margin: 0 10px;
`;

const Input = styled.input`
  font-family: sans-serif;
  background-color: #BAE3FF;
  color: #000080;
  border-style: none;
  width: 350px;
  height: 1.78rem;
  border-radius: 3px;
  font-size: 22px;
  margin-top: 5px;
  padding-left: 5px;
  margin-left: 10px;

  ${props => props.placeholder && css`
    font-size: 16px;
  `}
  ${props => props.none && css`
     display: none;
  `}
`;

export {
  Svg,
  Input
}
