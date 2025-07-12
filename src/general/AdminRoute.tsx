import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";


export default function AdminRoute() {


    const {token, storedUserInfo} = useAuthContext();

    if (token) {
        return <Navigate to="/" replace />;
    }

    if (storedUserInfo !== "Kangiriyanka") {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}