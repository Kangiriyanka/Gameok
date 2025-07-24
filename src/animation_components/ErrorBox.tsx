import { AnimatePresence, easeInOut, motion } from "framer-motion";
import {useState, useEffect} from "react"

type ErrorBoxProps = {
  handleDismiss: () => void;
  isCover: boolean;
  response: string;
  count?: number; 
};
const errorTransitionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition : {duration: 0.2 , easeInOut}
};



export default function ErrorBox({ handleDismiss, isCover, response, count = 0 }: ErrorBoxProps) {

  const [visible, setVisible] = useState(true)

  // Remove the error message after 2 seconds
  // Set the visible again to true for the next animation.
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      handleDismiss();
      
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
      className={isCover ? "cover-error-message" : "error-message"}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <p>{response}</p>
    </motion.div>
    }
    </AnimatePresence>

  
  )
    
  

}