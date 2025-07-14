import { AnimatePresence, motion } from "framer-motion";

type ErrorBoxProps = {
  response: string;
  count?: number; // optional, in case you want to pass in a key differentiator
};
const errorTransitionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function ErrorBox({ response, count = 0 }: ErrorBoxProps) {
  return (


    <motion.div
      key={response + count}
      variants={errorTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="error-message"
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {response}
    </motion.div>

  
  );
}