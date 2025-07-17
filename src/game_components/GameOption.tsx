type GameOptionProps = {
  name: string;
  onGameSelect: (console: string) => void;
};

export default function GameOption({ name, onGameSelect }: GameOptionProps) {
  return (
    <button onClick = {() => onGameSelect(name)} className="p-2 border rounded-md shadow-sm">
      {name}
    </button>
  );
}