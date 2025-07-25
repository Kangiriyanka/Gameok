import type {useSpring} from "motion/react"

export const gameTransitionVariants = {
  initial: {
    opacity: 0,
    scaleX: 0,
  },
  animate: {
    opacity: 1,
    scaleX: 1,
    transition: {
      duration: 2.3,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    scaleX: 2,
    rotate: 30,
    transition: {
      duration: 3,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};


export const errorTransitionVariants = {

   initial: {
    opacity: 0,
    scaleX: 0,
  },
  animate: {
    opacity: 1,
    scaleX: 1,
    transition: {
      duration: 2.3,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    scaleX: 2,
    rotate: 180,
    transition: {
      duration: 10,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
  


}

export const buttonVariants = {
  initial: {
    rotate: 0
  },

  animate: {
    rotate: [0, 2, -2, 2, 0], 
    
    transition: {
      duration: 0.4,
      ease: [0.33, 1, 0.68, 1] as [number, number, number, number],
    },
  },

  exit: {
    rotate: 0
  }

}


// Helicopter Parent

export const containerVariants = {


  initial: {
    opacity: 0,
    scale: 0.9
  
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      staggerChildren: 0.08,

    },
  },

   exit: {
    opacity: 0,
    rotate: 0,
    scale: 10,
  
  }

};


// Naughty Child
export const consoleVariants = {

  initial: {
    opacity: 0,
    y: -20,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,


 
  },

  exit: {
    opacity: 0,
    rotate: 0,
    scale: 10,

  }

};




export const gameContainerVariants = {

  initial: {
    opacity: 0,
    scale: 0.9
    
  
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.1,


    
    },
  },

   exit: {
    opacity: 0,
    rotate: 0,
    scale: 10,
  
  }


}
export const gameVariants = {

    initial: {
    opacity: 0,
    scale: 0.8
    
  
  },
  animate: {
    opacity: 1,
    scale: 1,

    
 
  },

   exit: {
    opacity: 0,
    rotate: 0,
    scale: 10,
  
  }


}