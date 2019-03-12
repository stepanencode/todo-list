import React from "react";
import { NavLink } from "react-router-dom";
import  {
  LogIn
} from "./styles";

const LogInLink = () => {
  return(
    <NavLink to="/login">
      <LogIn>Log In</LogIn>
    </NavLink>
  );
}

export default LogInLink;
