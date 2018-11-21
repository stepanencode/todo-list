import React, { Component } from "react";
import styled from "styled-components";
import Gugi from "./fonts/Gugi-Regular.ttf";
import InlineSVG from "svg-inline-react";
import img from "./signup-background.jpeg";

const SignupBackground = styled.div`
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
     top: 0;
     left: 0;
     opacity: 0.8;
   }
`;

const Svg = styled(InlineSVG)`
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
`;

const Label = styled.label`
  position: relative;
`;

const Form = styled.form`
  font-family: sans-serif;
  background-color: #faf3cf;
  color: #000080;
  border-style: none;
  width: 550px;
  height: 500px;
  border-radius: 8px;
  font-size: 22px;
  margin: 0 auto;
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
`;

const SignUpWrapper = styled.div `
  margin: 0 auto;
  width: 100%;
`;

const SignUpHeader = styled.h3 `
  padding: 20px 0;
  font-family: 'Gugi';
  src: url(${Gugi});
  text-align: center;
  font-size: 40px;
  color: #025278;
`;

const SignUpButton = styled.button `
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
      border: 2px solid #c9d7d8;
    }
`;
const InputWrapper = styled.div `
  margin: 0 auto;
  width: 100%;
`;

class SignUpForm extends Component{
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      fullName: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state)
  }
  render() {
    return(
      <SignupBackground>
        <Form onSubmit={this.handleSubmit}>
          <SignUpHeader>Sign Up to Your Account</SignUpHeader>
          <SignUpWrapper>
          <InputWrapper>
          <Label>
            <Svg src={require(`!raw-loader!./icons/envelope.svg`)} raw={true}/>
            <Input type="email" id="email" onChange={this.handleChange} maxLength={50} placeholder={"email address"}/>
          </Label>
          </InputWrapper>
          <InputWrapper>
          <Label>
            <Svg src={require(`!raw-loader!./icons/key.svg`)} raw={true}/>
            <Input type="password" id="password" onChange={this.handleChange} maxLength={50} placeholder={"password"}/>
          </Label>
          </InputWrapper>
          <InputWrapper>
          <Label>
            <Svg src={require(`!raw-loader!./icons/user.svg`)} raw={true}/>
            <Input type="text" id="fullname" onChange={this.handleChange} maxLength={50} placeholder={"full name"}/>
          </Label>
          </InputWrapper>
          </SignUpWrapper>
          <div>
            <SignUpButton pressed={this.onClick}>Sign Up</SignUpButton>
          </div>
        </Form>
      </SignupBackground>
    )
  }
}

export default SignUpForm;
