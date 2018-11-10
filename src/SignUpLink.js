import React, { Component } from "react";
import styled from "styled-components";
import Gugi from "./fonts/Gugi-Regular.ttf";
import { NavLink } from "react-router-dom"


const SignUp = styled.a `
  color: #5dcde3;
  display: inline-block;
  font-size: 20px;
  margin: 0;
  padding: 0 8px;
  float: left;
  line-height: 60px;

  &:hover  {
    color: #c9d7d8;
  }
`;

const SignUpLink = () => {
  return(
        <NavLink to="/signup">
          <SignUp>Sign Up</SignUp>
        </NavLink>
  )
}

export default SignUpLink;
