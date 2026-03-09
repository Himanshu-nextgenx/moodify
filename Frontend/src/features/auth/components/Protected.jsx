import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router'
const Protected = ({children}) => {
//  const navigate = useNavigate()
    const {user , loding}= useAuth()

    if(loding){
        return  <h1>Loading...</h1>
    }
    if( !user){
 <Navigate to="/login"/>
    }
  return  children
  
}

export default Protected
