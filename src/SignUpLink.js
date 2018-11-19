import React from "react";
import styled from "styled-components";
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
    color: #faf3cf;
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
