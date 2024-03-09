import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Todo from '../pages/todo'
import ProtectedRoutes from '../routes/ProtectedRoutes'
import Login from '../pages/login'
import SignUp from '../pages/signUp'
import AuthRoutes from '../routes/AuthRoutes'

export const AppRouter = () => {
    return (

        <Router>
            <Routes>
                <Route element={<AuthRoutes />}>
                    <Route path='/login' element={<Login />} />
                    <Route path='/signUp' element={<SignUp />} />
                </Route>
                <Route element={<ProtectedRoutes />}>
                    <Route path='/' element={<Todo />} />
                </Route>
            </Routes>
        </Router>



    )
}
