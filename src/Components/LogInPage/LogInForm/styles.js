import styled, { css }  from "styled-components";
import Gugi from "../../../fonts/Gugi-Regular.ttf";
import InlineSVG from "svg-inline-react";
import { keyframes } from "styled-components";
import img from "./login-background.jpeg";

const LoginBackground = styled.div`
  overflow: hidden;
  min-height: 100vh;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  z-index: 1;
    &:before {
     content: url(${img});
     z-index:-1;
     position: absolute;
     top: -20%;
     left: 0;
     opacity: 0.8;
   }
`;

const Svg = styled(InlineSVG)`
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);


  ${props => props.right && css`
    position: absolute;
    top: 50%;
    left: 495px;
    transform: translateY(-50%);
  `}

  ${props => props.none && css`
    display: none;
  `}
`;

const Label = styled.label`
  position: relative;
`;

const FormStyle = styled.form`
  font-family: sans-serif;
  background-color: #faf3cf;
  color: #000080;
  border-style: none;
  width: 550px;
  height: 400px;
  border-radius: 8px;
  font-size: 22px;
  margin: 0 auto;
`;

const borderAnimation = keyframes`
  from {
    border-bottom: 2px solid  #dcd8c8;
  }
  to {
    border-bottom: 2px solid  #025278;
  }
`;

const Input = styled.input `
  background-color: #faf3cf;
  padding: 15px 60px;
  width: 530px;
  margin-left: 10px;
  border-radius: 0;
  border: none;
  border-bottom: 2px solid  #025278;
  box-sizing: border-box;
  &:focus{
    animation: ${borderAnimation} 2s 1 forwards;
  }
  &:invalid {
  box-shadow: none;
  }

  ${props => props.error && css`
    &:focus{animation: ${borderAnimation} 0s ;}
    border-bottom: 2px solid  #FF6347;
  `}

  ${props => props.radio && css`
    opacity: 0.3;
    width: 5px;
  `}
`;

const LogInWrapper = styled.div `
  margin: 0 auto;
  width: 100%;
`;

const LogInHeader = styled.h3 `
  padding: 20px 0;
  font-family: 'Gugi';
  src: url(${Gugi});
  text-align: center;
  font-size: 40px;
  color: #025278;
`;

const LogInButton = styled.button `
  border: none;
  background-color: #025278;
  color: #faf3cf;
  margin-left: 25px;
  margin-top: 40px;
  border-radius: 3px;
  padding: 0.25em 1em;
  width: 500px;
  font-size: 30px;
    &:hover  {
      border: 2px solid #faf3cf;
    }
`;

const InputWrapper = styled.div `
  margin: 0 auto;
  width: 100%;
`;

const ErrorWrapper = styled.div `
  padding-left: 70px;
  padding-top: 5px;
  font-size: 14px;
`;

export {
  LoginBackground,
  Svg,
  Label,
  FormStyle,
  Input,
  LogInWrapper,
  LogInHeader,
  LogInButton,
  InputWrapper,
  ErrorWrapper
}
