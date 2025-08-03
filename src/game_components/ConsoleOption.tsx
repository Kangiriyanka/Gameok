import {motion} from "motion/react"

type ConsoleOptionProps = {
  name: string;
  selected: string
  onConsoleSelect: (console: string) => void;
};

export default function ConsoleOption({ name, selected, onConsoleSelect }: ConsoleOptionProps) {
  return (
    <motion.button 
     whileHover={{ scale: 1.10}}
     whileTap={{ scale: 0.95 }}
     transition = {{duration: 0.2}}
    onClick = {() => onConsoleSelect(name)} 
    className={` console-option p-5 border text-lg rounded-lg shadow-[var(--double-shadow)] border border-[var(--n64-gray-clr)]   ${selected == name ? "active-console" : ""}`}>
      {name}
    </motion.button>
  );
}