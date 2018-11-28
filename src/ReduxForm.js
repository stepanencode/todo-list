import React, { Component } from "react";
import styled from "styled-components";
import img from "./signup-background.jpeg";
import Form from './Form'

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

class ReduxForm extends Component{
    handleSubmit = (values) => {
        console.log(values);
    };
    render() {
        return (
            <SignupBackground>
                <Form onSubmit={this.handleSubmit} />
            </SignupBackground>
        );
    }
}

export default ReduxForm;
