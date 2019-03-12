import React from "react";
import { NavLink } from "react-router-dom";

import {
  SignUp
} from "./styles";

const SignUpLink = () => {
  return(
    <NavLink to="/signup">
      <SignUp>Sign Up</SignUp>
    </NavLink>
  );
}

export default SignUpLink;
