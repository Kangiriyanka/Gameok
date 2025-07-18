import {motion} from "motion/react"

type ConsoleOptionProps = {
  name: string;
  selected: string
  onConsoleSelect: (console: string) => void;
};

export default function ConsoleOption({ name, selected, onConsoleSelect }: ConsoleOptionProps) {
  return (
    <motion.button 
     whileHover={{ scale: 1.1 }}
     whileTap={{ scale: 0.8 }}
    transition = {{duration: 0.2}}
    onClick = {() => onConsoleSelect(name)} 
    className={`p-2 border rounded-md shadow-sm  ${selected == name ? "active-console" : ""}`}>
      {name}
    </motion.button>
  );
}