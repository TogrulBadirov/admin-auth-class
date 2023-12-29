import React, { useContext } from 'react'
import { Outlet } from 'react-router';
import { AuthContext } from '../context/authContext';

import { useNavigate } from "react-router-dom";
const PrivateRoute = ({role}) => {
  const { token, setToken, decodedUser, setDecodedUser } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <>
    {role.includes(decodedUser.role)?<Outlet/>:navigate('/')}
    </>
  )
}

export default PrivateRoute