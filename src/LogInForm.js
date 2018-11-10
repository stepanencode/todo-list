import React, { Component } from "react";
import styled from "styled-components";
import Gugi from "./fonts/Gugi-Regular.ttf";
import InlineSVG from "svg-inline-react";
import img from "./boat.jpg";

const LoginBackground = styled.div`

  overflow: hidden;
  // background-color: blue;

  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  font-size: 14px;
  font-family: sans-serif;
  min-height: 100vh;

  position: relative;
   z-index:1;

   &:before {
     content: url(${img});
     z-index:-1;
     position:absolute;
     left:0;
     top:0;
     opacity: 0.5;
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
  background-color: #BAE3FF;
  color: #000080;
  border-style: none;
  width: 550px;
  height: 450px;
  border-radius: 8px;
  font-size: 22px;
  margin: 0 auto;
  z-index: 100;


`;

const Input = styled.input `
  background-color: #BAE3FF;
  padding: 15px 60px;
  width: 530px;
  margin-left: 10px;
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
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
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
      <LoginBackground>
        <Form onSubmit={this.handleSubmit}>
          <LoginHeader>Log In to Your Account</LoginHeader>
          <EmailWrapper>
            <Label>
              <Svg src={require(`!raw-loader!./icons/envelope.svg`)} raw={true}/>
              <Input type="email" id="email" onChange={this.handleChange} maxLength={50} placeholder={"email address"}/>
            </Label>
          </EmailWrapper>
          <Label>
            <Svg src={require(`!raw-loader!./icons/key.svg`)} raw={true}/>
            <Input type="password" id="password" onChange={this.handleChange} maxLength={50} placeholder={"password"} />
          </Label>
          <div>
            <LogInButton>Log In</LogInButton>
          </div>
        </Form>
      </LoginBackground>
    )
  }
}

export default LogInForm;
