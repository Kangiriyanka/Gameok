


import Sidebar from "./Sidebar.tsx"
import { useAuthContext } from '../context/AuthContext.tsx';
import { Navigate, Outlet  } from "react-router-dom";
import AnimationWrapper from "@/animation_components/AnimationWrapper.tsx";
import { AnimatePresence } from "motion/react";


export default function Root() {
  

    const {storedUserInfo} = useAuthContext()


    if (!storedUserInfo) return <Navigate to="/" replace />;

 
    return (
        <div id= "layout">
        <Sidebar/>
        <main>
      
            <AnimatePresence>
                <AnimationWrapper>
                    <Outlet/>
                </AnimationWrapper>
            </AnimatePresence>
    
           
     
        
        </main>
        </div>

    )


}