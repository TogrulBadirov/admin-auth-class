// import React, { createContext, useState } from 'react'

// export const AuthContext = createContext()

// const AuthProvider = () => {
//     const [first, setfirst] = useState(second)
//   return (
//     <div>authContext</div>
//   )
// }

// export default AuthProvider

import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

function AuthProvider ({children}) {
    const [token, setToken] = useState(localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):null)
    useEffect(() => {
      localStorage.setItem('token',JSON.stringify(token))
    }, [token])
    
    const data ={
        token,
        setToken
    }
  return (
    <AuthContext.Provider value={data}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider