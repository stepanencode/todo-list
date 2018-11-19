import React, { Component } from "react";
import styled from "styled-components";
import Gugi from "./fonts/Gugi-Regular.ttf";
import InlineSVG from "svg-inline-react";
import img from "./login-background.jpeg";
import { connect } from "react-redux";
import { loginFormFillingEmail, loginFormFillingPassword } from "./actions";

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
  height: 450px;
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

const EmailWrapper = styled.div `
  margin: 0 auto;
  width: 100%;
`;

const LoginHeader = styled.h3 `
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

class LogInForm extends Component{
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     email: "",
  //     password: ""
  //   };
  // }

  handleChangeEmail = (event) => {
    // this.setState({
    //   [event.target.id]: event.target.value
    // })
    this.props.loginFormFillingEmail(event.target.value);
    console.log(event.target.value);
  }

  handleChangePassword = (event) => {
    this.props.loginFormFillingPassword(event.target.value);
    console.log(event.target.value);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.props);
  }

  render() {
    return(
      <LoginBackground>
        <Form onSubmit={this.handleSubmit}>
          <LoginHeader>Log In to Your Account</LoginHeader>
          <EmailWrapper>
            <Label>
              <Svg src={require(`!raw-loader!./icons/envelope.svg`)} raw={true}/>
              <Input type="email" id="email" onChange={this.handleChangeEmail} maxLength={50} placeholder={"email address"} />
            </Label>
          </EmailWrapper>
          <Label>
            <Svg src={require(`!raw-loader!./icons/key.svg`)} raw={true}/>
            <Input type="password" id="password" onChange={this.handleChangePassword} maxLength={50} placeholder={"password"} />
          </Label>
          <div>
            <LogInButton>Log In</LogInButton>
          </div>
        </Form>
      </LoginBackground>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.email,
    password: state.password
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginFormFillingEmail: (email) => dispatch(loginFormFillingEmail(email)),
    loginFormFillingPassword: (password) => dispatch(loginFormFillingPassword(password))
  };
};

const LogInFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LogInForm);

export default LogInFormContainer;
