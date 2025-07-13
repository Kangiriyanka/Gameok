// src/components/PageWrapper.tsx
import { motion } from "motion/react";
import { gameTransitionVariants } from "../assets/scripts/animations.ts";

/* This is the logic being used.

function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{ 
          name: 'Katsuko Saruhashi',
          imageId: 'YfeOqp2'
        }}
      />
    </Card>
  );
}
*/


type PageWrapperProps = {
  children: React.ReactNode;
};



export default function AnimationWrapper({ children }: PageWrapperProps) {

  return (
    <motion.div

      variants={gameTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
     
      {children}
    </motion.div>
  );
}