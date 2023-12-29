import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import { AuthContext } from "../../context/authContext";

import './index.scss'

const Navbar = () => {
  const { token, setToken, decodedUser, setDecodedUser } =
    useContext(AuthContext);
  return (
    <nav>
      {token ? (
        <>
          <Link to="profile">Profile</Link>
          <Link to="news">News</Link>
          {decodedUser.role === "admin"?<Link to="admin">Admin</Link>:""}
        </>
      ) : (
        <>
          <Link to="/">Home</Link>
          <Link to="login">Login</Link>
          <Link to="register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
