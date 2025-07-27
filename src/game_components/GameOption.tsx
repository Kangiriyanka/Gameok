import { motion } from "motion/react";

type GameOptionProps = {
  name: string;
  selected: string;
  onGameSelect: (console: string) => void;
};

export default function GameOption({ name, selected, onGameSelect }: GameOptionProps) {
  return (
    <motion.button 
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9}}
      onClick = {() => onGameSelect(name)} 
      className= {`  p-2  h-20 border text-lg rounded-lg border border-[var(--n64-gray-clr)]    ${selected == name ? "active-game" : ""}` }>
      {name}
    </motion.button>
  );
}