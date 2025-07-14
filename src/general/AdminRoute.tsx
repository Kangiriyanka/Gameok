import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Sidebar from "./Sidebar.tsx"


export default function AdminRoute() {


    const {storedUserInfo} = useAuthContext();

  
    if (storedUserInfo !== "Kangiriyanka") {
        return <Navigate to="/" replace />;
    }

    return (
    <div id= "layout">
    <Sidebar/>
    <main>
    <Outlet/>
    </main>
    </div>
        
    );
}