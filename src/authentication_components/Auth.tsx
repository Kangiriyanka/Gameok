


import { useAuthContext } from '../context/AuthContext.tsx';
import { Navigate, Outlet } from "react-router-dom";


export default function Auth() {
    const {storedUserInfo} = useAuthContext() 

    if (storedUserInfo) 
        return <Navigate to="/dashboard" replace />;
   


    return <Outlet/>
}