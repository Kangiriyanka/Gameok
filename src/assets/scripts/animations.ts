export const pageTransition = {
  initial: {
    opacity: 0,
    filter: "blur(8px)",
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.25,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    filter: "blur(8px)",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};



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