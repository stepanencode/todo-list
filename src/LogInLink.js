import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom"

const LogIn = styled.a `
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

const LogInLink = () => {
  return(
        <NavLink to="/login">
          <LogIn>Log In</LogIn>
        </NavLink>
  )
}

export default LogInLink;
