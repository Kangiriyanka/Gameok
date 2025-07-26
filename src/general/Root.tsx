


import Sidebar from "./Sidebar.tsx"
import { useAuthContext } from '../context/AuthContext.tsx';
import { Navigate, Outlet,useLocation } from "react-router-dom";
import AnimationWrapper from "@/animation_components/AnimationWrapper.tsx";
import { AnimatePresence, motion } from "motion/react";




export default function Root() {
  

    const {storedUserInfo} = useAuthContext()
    const location = useLocation();
    if (!storedUserInfo) return <Navigate to="/" replace />;

 
    return (
        <div id= "layout">
        <Sidebar/>
        <main>
        <AnimatePresence mode="wait">
       
               <Outlet/>
     
        </AnimatePresence>
        </main>
        </div>

    )


}