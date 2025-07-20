import { AnimatePresence, motion } from "framer-motion";

type ErrorBoxProps = {
  isCover: boolean;
  response: string;
  count?: number; 
};
const errorTransitionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};



export default function ErrorBox({ isCover, response, count = 0 }: ErrorBoxProps) {
  
  return (


    <motion.div
      key={response + count}
      variants={errorTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={isCover ? "cover-error-message" : "error-message"}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <p>{response}</p>
    </motion.div>

  
  );
}