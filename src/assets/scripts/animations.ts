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