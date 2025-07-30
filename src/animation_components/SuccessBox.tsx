import { AnimatePresence,  motion } from "motion/react";
import {useState, useEffect} from "react"

type SuccessBoxProps = {

  handleDismiss: () => void;
  response: string;
  count?: number; 
};
const errorTransitionVariants = {
  initial: { opacity: 0, y: -5},
  animate: { opacity: 1, scale: 1.2, y: 0, transition: {delay: 0.3,  type: "spring", bounce: 0.40 }},
  exit: { opacity: 0, rotate: 0, y: 0},
  transition: {delay: 0.3}
 


};



export default function SuccessBox({ response, count = 0 , handleDismiss}: SuccessBoxProps) {

  const [visible, setVisible] = useState(true)

  // Remove the error message after 2 seconds
  // Set the visible again to true for the next animation.
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
       setTimeout(() => {
      handleDismiss()
    }, 300) // Match exit duration
  }, 2000)
     
      


    setVisible(true)
    return () => clearTimeout(timer)
  },[])
  
  return (

    <AnimatePresence mode="wait"> 
    
    {visible &&

    <motion.div
      key= {count}
      variants={errorTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="success-box"
    
      
    >
      <p>{response}</p>
    </motion.div>
    }

    </AnimatePresence>

  
  )
    
  

}