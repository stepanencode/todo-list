import React from "react";
import { NavLink } from "react-router-dom";

import {
  UserIn
} from './styles'

const UserLink = () => {
  return(
        <NavLink to="/user">
          <UserIn></UserIn>
        </NavLink>
  )
}

export default UserLink;
