import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";


export default function AdminRoute() {


    const auth = useAuthContext();

    if (!auth?.token) {
        return <Navigate to="/" replace />;
    }

    if (auth.storedUserInfo !== "Kangiriyanka") {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}