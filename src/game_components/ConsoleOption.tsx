type ConsoleOptionProps = {
  name: string;
  onConsoleSelect: (console: string) => void;
};

export default function ConsoleOption({ name, onConsoleSelect }: ConsoleOptionProps) {
  return (
    <button onClick = {() => onConsoleSelect(name)} className="p-2 border rounded-md shadow-sm">
      {name}
    </button>
  );
}