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

export const consoleVariants = {
  hover : {scale: 1.1},
  initial : {scale: 0, rotate: 30},
  animate: {scale: 1, rotate: 0 },
  exit: {rotate: 20, scale: 0.5 , backgroundColor: "red"},

}