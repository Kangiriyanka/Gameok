


import Sidebar from "./Sidebar.tsx"
import { useAuthContext } from '../context/AuthContext.tsx';
import { Navigate, Outlet } from "react-router-dom";



export default function Root() {
  

    const {storedUserInfo} = useAuthContext()
    console.log(storedUserInfo)
    if (!storedUserInfo) return <Navigate to="/" replace />;

 
    return (
        <div id= "layout">
        <Sidebar/>
        <main>
        <Outlet/>
        </main>
        </div>

    )


}