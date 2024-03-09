import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {

    // console.log(localStorage.getItem('user uid'))
    const a = localStorage.getItem('user uid')
    // console.log('a=====>', a)



    const auth = {
        // if user uid exists then -> todo 
        token: a ? true : false

        // token: localStorage.getItem('user uid') ? true : false
        // token: false,
    }
    return (
        // auth.token ? <Outlet /> : <Navigate to={'/login'} />
        auth.token ? <Outlet /> : <Navigate to={'/signUp'} />
    )

}

export default ProtectedRoutes