import React, { useContext } from 'react'
import { AuthContext } from '../../context/authContext';

const News = () => {
const { token, setToken, decodedUser, setDecodedUser } = useContext(AuthContext);

  return (
    <>
    <div>News</div>
    <button onClick={()=>console.log(decodedUser)}>log</button>
    </>
  )
}

export default News