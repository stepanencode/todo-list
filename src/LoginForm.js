import React, { Component } from "react";
import styled from "styled-components";
import Gugi from "./fonts/Gugi-Regular.ttf";

const Form = styled.form`
  display: none;
  font-family: sans-serif;
  background-color: #BAE3FF;
  color: #000080;
  border-style: none;
  width: 550px;
  height: 450px;
  border-radius: 8px;
  font-size: 22px;
  margin: 0 auto;
`;

const Input = styled.input `
  background-color: #BAE3FF;
  padding: 15px 30px;
  width: 500px;
  margin-left: 25px;
  border-radius: 0;
  border: none;
  border-bottom: 2px solid  #025278;
  box-sizing: border-box;
`;

const EmailWrapper = styled.div `
margin: 0 auto;
width: 100%;
`;

const LoginHeader = styled.h3 `
  padding: 20px 0;
  font-family: Gugi;
  text-align: center;
  font-size: 40px;
  color: #025278;
`;

const LogInButton = styled.button `
  border: none;
  background-color: #025278;
  color: #c9d7d8;
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


class LogInForm extends Component{

  handleChange = (e) => {
    console.log(e)
  }
  handleSubmit = (e) => {
    console.log(e)
  }

  onClick = (e) => {
    console.log(e)
  }
  render() {
    return(
      <div>
        <Form onSubmit={this.handleSubmit}>
          <LoginHeader>Log In to Your Account</LoginHeader>
          <EmailWrapper>

            <Input type="email" id="email" onChange={this.handleChange} maxLength={50} placeholder={"email address"}/>
          </EmailWrapper>
          <div>

            <Input type="password" id="password" onChange={this.handleChange} maxLength={50} placeholder={"password"}/>
          </div>
          <div>
            <LogInButton pressed={this.onClick}>Log In</LogInButton>
          </div>
        </Form>
      </div>
    )
  }
}

export default LogInForm;
