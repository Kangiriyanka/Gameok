


import { useAuthContext } from '../context/AuthContext.tsx';
import { Navigate, Outlet } from "react-router-dom";


export default function Auth() {
    const {token} = useAuthContext() 
    if (token) return <Navigate to="/dashboard" replace />;

    return <Outlet/>
}