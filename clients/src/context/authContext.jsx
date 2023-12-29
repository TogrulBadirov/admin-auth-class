import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useState(
    localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null
  );
  const [decodedUser, setDecodedUser] = useState("");
  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(token));
    token? setDecodedUser(jwtDecode(token)) : ''
  }, [token]);

  const data = {
    token,
    setToken,
    decodedUser,
    setDecodedUser,
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
