


import AnimationWrapper from "@/animation_components/AnimationWrapper";
import { AnimatePresence } from "motion/react";
import { Outlet } from "react-router-dom";


export default function GameLayout() {
 
 
    return (
        <AnimatePresence mode="wait">
        <AnimationWrapper>
        <Outlet/>
        </AnimationWrapper>
        </AnimatePresence>

     
    )


}