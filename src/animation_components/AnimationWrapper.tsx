
import {  motion } from "motion/react";
import { pageTransition } from "../assets/scripts/animations.ts";




type PageWrapperProps = {

  children: React.ReactNode;
};



export default function AnimationWrapper({ children }: PageWrapperProps) {

  return (
  
    <motion.div
    
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit ="exit"
    

    >
     
      {children}
    </motion.div>
   
  );
}