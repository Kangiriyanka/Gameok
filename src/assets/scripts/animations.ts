export const gameTransitionVariants = {
  initial: {
    opacity: 0,
    scaleX: 0,
  },
  animate: {
    opacity: 1,
    scaleX: 1,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    translateX: 100,
    transition: {
      duration: 3,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};