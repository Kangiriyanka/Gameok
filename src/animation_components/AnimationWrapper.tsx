
import {  motion } from "motion/react";
import { pageTransition } from "../assets/scripts/animations.ts";
import { useLocation } from "react-router";




type PageWrapperProps = {

  children: React.ReactNode;
};



export default function AnimationWrapper({ children }: PageWrapperProps) {

  const location = useLocation()

  return (
  
    <motion.div
      className="page-wrapper"
      key = {location.key}
      variants={pageTransition}
      initial="initial"
      animate="animate"
     
    

    >
     
      {children}
    </motion.div>
   
  );
}