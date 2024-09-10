import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'

function ProtectedRoute() {
    const auth = useSelector((state)=>{return state.auth.access})
 
  
  return (
    auth?<Outlet/>:<Navigate to="/login"/>
  )
}

export default ProtectedRoute
