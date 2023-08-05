import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'

function PrivateRoute() {
    const loggedIn=localStorage.getItem("authentication")
    if(loggedIn==="true"){
         return <Outlet />
    }
    else{
        return <Navigate to="/login" />
    }
}

export default PrivateRoute