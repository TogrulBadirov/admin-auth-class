import React, { useState } from "react";
import axios from "axios"

const Register = () => {
  const [userForm, setUserForm] = useState({
    username: "",
    password: "",
  });
  const handleRegister = async () => {
    const resp = await axios.post("http://localhost:5123", {
      username: userForm.username,
      password: userForm.password,
    });
    setUserForm({
        username: "",
        password: "",
      })
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
      <button onClick={() => handleRegister()}>Sign In</button>
    </>
  );
};

export default Register;
