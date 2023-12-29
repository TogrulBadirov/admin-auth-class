import React, { useContext } from 'react'
import { Navigate } from 'react-router'
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/authContext';
const Profile = () => {
    const navigate = useNavigate();
    const { token, setToken, decodedUser, setDecodedUser } =
    useContext(AuthContext);
  return (
    <>
    <div>{decodedUser.username}</div>
    <div>Role:{decodedUser.role}</div>

    <button onClick={()=>{
        setToken(null)
        navigate('/')
    }}>Log Out</button>
    </>
  )
}

export default Profile