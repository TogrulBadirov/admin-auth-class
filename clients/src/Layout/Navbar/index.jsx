import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {
  const { token, setToken } = useContext(AuthContext);
  return (
    <>
      <Link to="/">Home</Link>
      {token ? (
        <Link to="profile">Profile</Link>
      ) : (
        <>
          <Link to="login">Login</Link>
          <Link to="register">Register</Link>
        </>
      )}
    </>
  );
};

export default Navbar;
