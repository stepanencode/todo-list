import React, { Component } from "react";
import styled from "styled-components";
import Gugi from "./fonts/Gugi-Regular.ttf";
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
    color: #c9d7d8;
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
