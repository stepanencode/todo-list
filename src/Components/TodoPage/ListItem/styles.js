import styled, { css } from "styled-components";
import InlineSVG from "svg-inline-react";

const ItemWrapper = styled.li`
  padding-bottom: 10px;
  margin-top: 10px;
  background-color: #ffffff;
  opacity: 0.9;
  border-radius: 3px;
  list-style: none;

  &:hover {
    opacity: 1;
  }

  &:first-child {
    margin-top: 0;
  }
`;

const Svg = styled(InlineSVG)`
  vertical-align: middle;
  margin: 0;
`;

const SvgWrapper = styled.span`
 margin: 0 10px;
`;

const TextItem = styled.p`
  display: inline-block;
  font-family: sans-serif;
  color: #000080;
  font-size: 20px;
  max-width: 500px;
  word-break: break-all;
  vertical-align: middle;
`;

const Button = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 0 10px;
  background: transparent;
  color: #ff6347;
  border: 2px solid #ff6347;
  width: 150px;

  &:hover  {
    color: #fa2600;
    border-color: #fa2600;
    background-color: #ffefec;
  }

  ${props => props.primary && css`
    background: white;
    color: #ff99ff;
    border: 2px solid #ff99ff;
    font-size: 1rem;
    vertical-align: bottom;
  `}

  ${props => props.pressed && css`
    background: #0099ff;
    color: white;
  `}

  ${props => props.disabled && css`
    background: white;
    color: gray;
    border: 2px solid gray;
  `}

  ${props => props.bigger && css`
    background: tomato;
    color: white;
    border: 2px solid tomato;
    width: 150px;
  `}
  ${props => props.unvisible && css`
    display: none;
  `}
`;

const Checkbox = styled.input`
  display: none;
`;

const Input = styled.input`
  background-color: #BAE3FF;
  color: #000080;
  border-style: none;
  width: 500px;
  height: 1.78rem;
  border-radius: 3px;
  font-size: 24px;
  margin-top: 10px;
    margin-bottom: 10px;
`;

export {
  ItemWrapper,
  Svg,
  SvgWrapper,
  TextItem,
  Button,
  Checkbox,
  Input
}
