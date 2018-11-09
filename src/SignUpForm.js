import React, { Component } from "react";
import styled from "styled-components";
import Gugi from "./fonts/Gugi-Regular.ttf";

const Form = styled.form`
  // display: none;
  font-family: sans-serif;
  background-color: #BAE3FF;
  color: #000080;
  border-style: none;
  width: 550px;
  height: 500px;
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

const SignUpWrapper = styled.div `
margin: 0 auto;
width: 100%;
`;

const SignUpHeader = styled.h3 `
  padding: 20px 0;
  font-family: Gugi;
  text-align: center;
  font-size: 40px;
  color: #025278;
`;

const SignUpButton = styled.button `
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


class SignUpForm extends Component{
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: ""
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
      <div>
        <Form onSubmit={this.handleSubmit}>
          <SignUpHeader>Sign Up to Your Account</SignUpHeader>
          <SignUpWrapper>
            <Input type="email" id="email" onChange={this.handleChange} maxLength={50} placeholder={"email address"}/>
            <Input type="password" id="password" onChange={this.handleChange} maxLength={50} placeholder={"password"}/>
            <Input type="text" id="first-name" onChange={this.handleChange} maxLength={50} placeholder={"First Name"}/>
            <Input type="text" id="last-name" onChange={this.handleChange} maxLength={50} placeholder={"Last Name"}/>
          </SignUpWrapper>
          <div>
            <SignUpButton pressed={this.onClick}>Sign Up</SignUpButton>
          </div>
        </Form>
      </div>
    )
  }
}

export default SignUpForm;
