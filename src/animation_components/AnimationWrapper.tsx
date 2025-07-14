
import {  motion } from "motion/react";
import { gameTransitionVariants } from "../assets/scripts/animations.ts";
import { useLocation } from "react-router-dom";


type PageWrapperProps = {
  children: React.ReactNode;
};



export default function AnimationWrapper({ children }: PageWrapperProps) {
  const location = useLocation()
  return (
  
    <motion.div
      key= {location.pathname}
      variants={gameTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
     
      {children}
    </motion.div>
   
  );
}