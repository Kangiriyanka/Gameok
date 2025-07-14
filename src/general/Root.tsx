


import Sidebar from "./Sidebar.tsx"
import { useAuthContext } from '../context/AuthContext.tsx';
import { Navigate, Outlet } from "react-router-dom";



export default function ProtectedRoutes() {
    const {token} = useAuthContext() 
    if (!token) return <Navigate to="/login" replace />;

 
    return (
        <div id= "layout">
        <Sidebar/>
        

        <main>
        
        <Outlet/>
  
     
      
        </main>

        </div>

    )


}