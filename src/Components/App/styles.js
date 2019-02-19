import styled, { css } from "styled-components";
import { keyframes } from "styled-components";
import InlineSVG from "svg-inline-react";
import { injectGlobal } from "styled-components";
import Gugi from "../../fonts/Gugi-Regular.ttf";

import img from "./main-background.jpg";
import "normalize.css";

const Svg = styled(InlineSVG)`

  ${props => props.position && css`
    position: absolute;
    top: -15px;
    right: -19px;
    vertical-align: bottom;
    margin-left: 10px;
  `}

  ${props => props.add_item && css`
    vertical-align: bottom;
    margin-left: 10px;
  `}
`;

injectGlobal`
  body {
    overflow: hidden;
  }
  @font-face {
    font-family: 'Gugi';
    src: url(${Gugi});
  }
`;

const FilterWrapper = styled.div`
  margin-top: 10px;
`;

const Body = styled.div`
  background-image: url(${img});
  background-attachment:fixed;
  background-repeat: no-repeat;
  background-size: cover;
  font-size: 14px;
  font-family: sans-serif;
`;

const ToDoWrapper = styled.div`
  margin: auto;
  padding-bottom: 20px;
  min-height: 100vh;
  width: 80%;
  min-width: 660px;
  position: relative;
`;

const Header = styled.header`
  background-color: #025278;
  width: 100%;
  height: 60px;
`;

const HeaderWrapper = styled.div `
  margin: auto;
  width: 80%;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
`;

const User = styled.div `
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 5px;
  float: left;
`;

const ItemsCounter = styled.div`
  margin-top: 30px;
`;

const ItemsCounterText = styled.p`
  font-family: Gugi;
  display: inline-block;
  font-size: 55px;
  color: #ffffff;
  opacity: 0.9;
  margin: 0;
  padding-right: 2px;
`;

const Input = styled.input`
  font-family: sans-serif;
  background-color: #BAE3FF;
  color: #000080;
  border-style: none;
  width: 60%;
  height: 1.78rem;
  border-radius: 3px;
  font-size: 22px;
  padding-left: 5px;
  margin-left: 5px;
  margin-top: 15px;
`;

const Button = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 3px 10px;
  background: transparent;
  color: #098EA8;
  border: 2px solid #ffffff;
  width: 150px;
  background: #f2f2f2;
  opacity: 0.9;
  font-weight: 500;
  &:hover  {
    color: #025278;
  }

  ${props => props.pressed && css`
    background: #098EA8;
    color: #ffffff;
    opacity: 0.9;
  `}

  ${props => props.bigger && css`
    background: #098EA8;
    color: white;
    width: 150px;
  `}

  ${props => props.relax && css`
    background: #098EA8;
    color: white;
    width: 150px;
    padding-top: 8px;
    padding-bottom: 8px;
    margin-top: 10px;
    &:hover  {
      color: #025278;
      background: #faf3cf;
      border-color: white;
    }
  `}
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const WellDoneBox = styled.div`
  border-radius: 3px;
  padding: 0.25em 1em;
  background: #BAE3FF;
  color: #0099ff;
  color: #098EA8;
  border: 2px solid #098EA8;
  width: 300px;
  height: 200px;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  animation: ${fadeIn} 1sl
  cursor: pointer;
`;

const WellDoneMessage = styled.span`
  margin: 0 auto;
  color: #098EA8;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
`;

const WellDoneWrapper = styled.div`
   width:100%;
   min-height:100%;
   background-color: rgba(0,0,0,0.5);
   overflow:hidden;
   position:fixed;
   top:0px;
   left:0px;

   ${props => props.unvisible && css`
    display: none;
  `}
`;

const FilteredMessagesBox = styled.div`
  background-color: #ffffff;
  opacity: 0.9;
  border-radius: 3px;
  margin-top: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
  font-weight: bold;
  font-size: 16px;
  color: #098EA8;
  &:hover {
    opacity: 1;
  }
`;

const FilteredMessage = styled.p`
  margin: 0;
  padding-left: 10px;
`;

export {
  Svg,
  FilterWrapper,
  Body,
  ToDoWrapper,
  Header,
  HeaderWrapper,
  User,
  ItemsCounter,
  ItemsCounterText,
  Input,
  Button,
  WellDoneBox,
  WellDoneMessage,
  WellDoneWrapper,
  FilteredMessagesBox,
  FilteredMessage
}
