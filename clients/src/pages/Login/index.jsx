import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { token, setToken } = useContext(AuthContext);

  const [userForm, setUserForm] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleLogin = async () => {
    const resp = await axios.post("http://localhost:5123/login", {
      username: userForm.username,
      password: userForm.password,
    });
    
    setToken(resp.data)
    !resp.data.message ? navigate("/news") : console.log('err');
    setUserForm({
      username: "",
      password: "",
    });
    
  };
  return (
    <>
      <br />
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
        value={userForm.username}
      />
      <br />
      <input
        type="text"
        placeholder="Password"
        onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
        value={userForm.password}
      />
      <br />
      <button onClick={() => handleLogin()}>LogIn</button>
    </>
  );
};

export default Login;
