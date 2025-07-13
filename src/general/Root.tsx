


import Sidebar from "./Sidebar.tsx"
import {AnimatePresence} from "motion/react"
import { useAuthContext } from '../context/AuthContext.tsx';
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AnimationWrapper  from "../animation_components/AnimationWrapper.tsx";


export default function ProtectedRoutes() {
    const {token} = useAuthContext() 
    if (!token) return <Navigate to="/login" replace />;
    const location = useLocation();

    return (
        <div id= "layout">
        <Sidebar/>
        <main>
        <AnimatePresence mode="wait">
        <AnimationWrapper key={location.pathname}>
                 <Outlet/>
        </AnimationWrapper>
        </AnimatePresence>
        </main>

        </div>

    )


}