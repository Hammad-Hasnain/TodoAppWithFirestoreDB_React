import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AuthRoutes = () => {

    // console.log(localStorage.getItem('user uid'))
    const a = localStorage.getItem('user uid')
    // console.log('a=====>', a)

    const auth = {
        // if user uid doesn't exist then -> login || signUp
        token: !a ? true : false,
    }

    return (

        auth.token ? <Outlet /> : <Navigate to={'/'} />

    )
}

export default AuthRoutes