import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";



export default function ProtectedRoute() {


    const {storedUserInfo} = useAuthContext();
  
   if (!storedUserInfo) return <Navigate to="/" replace />;
    return <Outlet />;

}