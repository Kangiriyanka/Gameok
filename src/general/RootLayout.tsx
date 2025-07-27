


import Sidebar from "./Sidebar.tsx"
import { Outlet  } from "react-router-dom";
import AnimationWrapper from "@/animation_components/AnimationWrapper.tsx";
import { AnimatePresence } from "motion/react";


export default function RootLayout() {
  


 
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