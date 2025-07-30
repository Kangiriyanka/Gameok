


import Sidebar from "./Sidebar.tsx"
import { Outlet, useLoaderData  } from "react-router-dom";
import AnimationWrapper from "@/animation_components/AnimationWrapper.tsx";
import { AnimatePresence } from "motion/react";


export default function RootLayout() {

    const isAdmin = useLoaderData()

 
    return (
        <div id= "layout">
        <Sidebar isAdmin = {isAdmin} />
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