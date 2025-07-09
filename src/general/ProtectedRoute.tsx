import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";


export default function ProtectedRoute() {
    const {token} = useAuthContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}